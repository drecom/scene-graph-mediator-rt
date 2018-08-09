import { SchemaJson, Node } from '@drecom/scene-graph-schema';
import Importer from 'importer/Importer';

const TO_RADIAN = Math.PI / 180;

/**
 * Pixi implementation of RuntimeMediator
 */
export default class Pixi extends Importer {

  public onLoaderAdd: (node: Node, asset: { url: string, name: string }) => void
    = (_node: Node, _asset: { url: string, name: string }) => {};

  public getInitiator(name: string): (node: Node) => any {
    return (_node) => { return new (PIXI as any)[name](); };
  }

  public hasInitiator(name: string): boolean {
    return PIXI.hasOwnProperty(name);
  }

  public import(schema: SchemaJson, callback: (root: any) => void = (_) => {}): any {
    const root = new PIXI.Container();

    // resources
    const assets = [];
    for (let i = 0; i < schema.scene.length; i++) {
      let url, name;

      const node = schema.scene[i];
      if (node.spine) {
        url  = node.spine.url;
        name = node.id;
      } else if (node.sprite) {
        if (node.sprite.atlasUrl) {
          url  = node.sprite.atlasUrl;
          name = `${node.id}_atlas`;
        } else {
          url  = node.sprite.url;
          name = node.id;
        }
      } else {
        continue;
      }

      const asset = { url, name };

      this.onLoaderAdd(node, asset);
      assets.push(asset);
    }

    if (assets.length > 0) {
      PIXI.loader.add(assets).load(() => {
        this.restoreScene(root, schema);
        callback(root);
      });
    } else {
      this.restoreScene(root, schema);
      callback(root);
    }

    return root;
  }

  private restoreScene(root: PIXI.Container, schema: SchemaJson): void {
    const resources = PIXI.loader.resources;

    // create Map
    const nodeMap = new Map<string, Node>();
    for (let i = 0; i < schema.scene.length; i++) {
      const node = schema.scene[i];
      nodeMap.set(node.id, node);
    }

    const containerMap = this.createContainers(nodeMap, resources);

    this.restoreTransform(root, schema, nodeMap, containerMap);
  }

  private createContainers(
    nodeMap: Map<string, Node>,
    resources: any
  ): Map<string, PIXI.Container> {
    const containerMap = new Map<string, PIXI.Container>();

    nodeMap.forEach((node, id) => {
      let object: any;

      if (node.spine) {
        // object = new PIXI.spine.Spine(resources[node.id].data);
      } else if (node.sprite) {
        // TODO: base64 image
        let texture = (node.sprite.atlasUrl)
          ? PIXI.Texture.fromFrame(node.sprite.frameName)
          : resources[node.id].texture;
        object = new PIXI.Sprite(texture);
      } else if (node.text) {
        const style = new PIXI.TextStyle({});
        if (node.text.style) {
          style.fontSize  = node.text.style.size || 26;
          style.fill      = node.text.style.color || 'black';
          switch (node.text.style.horizontalAlign) {
            case 2 : style.align = 'right'; break;
            case 1 : style.align = 'center'; break;
            case 0 :
            default: style.align = 'left'; break;
          }
        }
        object = new PIXI.Text(node.text.text || '', style);
      } else if (this.hasInitiator(node.constructorName)) {
        object = this.getInitiator(node.constructorName)(node);
      } else {
        object = new PIXI.Container();
      }

      if (!object) {
        return;
      }

      object.name = node.name;

      containerMap.set(id, object);
    });

    return containerMap;
  }

  private restoreTransform(
    root: PIXI.Container,
    schema: SchemaJson,
    nodeMap: Map<string, Node>,
    containerMap: Map<string, PIXI.Container>
  ): void {
    const metadata = schema.metadata;

    const coordMul = {
      x: (metadata.positiveCoord.xRight ? 1 : -1),
      y: (metadata.positiveCoord.yDown  ? 1 : -1)
    };

    containerMap.forEach((container, id) => {
      const node = nodeMap.get(id);
      if (!node) {
        return;
      }

      const parentSize = {
        width:  metadata.width,
        height: metadata.height
      };

      const transform = node.transform;

      if (transform.parent === undefined) {
        root.addChild(container);
      } else {
        const parentContainer = containerMap.get(transform.parent);
        const parentNode      = nodeMap.get(transform.parent);
        if (!parentContainer || !parentNode) {
          return;
        }

        parentSize.width  = parentNode.transform.width  || 0;
        parentSize.height = parentNode.transform.height || 0;

        parentContainer.addChild(container);
      }

      const containerSize = {
        width:  (transform.width  === undefined) ? container.width  : transform.width,
        height: (transform.height === undefined) ? container.height : transform.height
      };

      const scale = (transform.scale) ? {
        x: transform.scale.x,
        y: transform.scale.y
      } : { x: 1, y: 1 };
      const rotation = (transform.rotation) ? transform.rotation * TO_RADIAN : 0;

      container.scale.set(scale.x, scale.y);
      container.rotation = rotation;

      let x = transform.x * coordMul.x;
      let y = transform.y * coordMul.y;
      x += (parentSize.width  - containerSize.width  * scale.x) * transform.anchor.x;
      y += (parentSize.height - containerSize.height * scale.y) * transform.anchor.y;

      if ((container as PIXI.Sprite).anchor) {
        (container as PIXI.Sprite).anchor.set(transform.anchor.x, transform.anchor.y);
        x += containerSize.width  * scale.x * transform.anchor.x;
        y += containerSize.height * scale.y * transform.anchor.y;
      }

      container.position.set(x, y);
    });
  }
}
