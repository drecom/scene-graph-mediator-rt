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
    const tempContainerMap = new Map<string, PIXI.Container>();
    const tempNodeMap      = new Map<string, Node>();

    const resources = PIXI.loader.resources;

    // instantiate all
    for (let i = 0; i < schema.scene.length; i++) {
      const node = schema.scene[i];

      const object: any = this.restoreNodeWithResource(node, resources);

      tempContainerMap.set(node.id, object);
      tempNodeMap.set(node.id, node);
    }

    // rebuild hielarchy
    tempContainerMap.forEach((v, k) => {
      const node = tempNodeMap.get(k);
      if (node && node.transform.parent) {
        const container = tempContainerMap.get(node.transform.parent);
        if (container) {
          container.addChild(v);
        }
      } else {
        root.addChild(v);
      }
    });
  }

  private restoreNodeWithResource(node: Node, resources: any): any {
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

    object.name = node.name;
    object.position.set(node.transform.x || 0, node.transform.y || 0);

    return object;
  }
}
