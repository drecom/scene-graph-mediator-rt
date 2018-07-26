import { SchemaJson, Node } from '@drecom/scene-graph-schema';
import Importer from 'importer/Importer';

/**
 * Pixi implementation of RuntimeMediator
 */
export default class Pixi extends Importer {

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
      const node = schema.scene[i];
      if (node.spine) {
        assets.push({ url: node.spine.url, name: node.id });
      } else if (node.sprite) {
        assets.push({ url: node.sprite.url, name: node.id });
      }
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
        object = new PIXI.Sprite(resources[node.id].texture);
      } else if (node.text) {
        const style = new PIXI.TextStyle({});
        if (node.text.style) {
          style.fontSize  = node.text.style.size || 26;
          style.fill      = node.text.style.color || 'black';
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

      container.position.set(
        transform.x * coordMul.x + (parentSize.width  - containerSize.width)  * transform.anchor.x,
        transform.y * coordMul.y + (parentSize.height - containerSize.height) * transform.anchor.y
      );
    });
  }
}
