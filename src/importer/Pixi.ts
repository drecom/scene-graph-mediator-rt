import { SchemaJson, Node } from '@drecom/scene-graph-schema';
import Importer from 'importer/Importer';

const DEGREE_TO_RADIAN = Math.PI / 180;

type NodeMap      = Map<string, Node>;
type ContainerMap = Map<string, PIXI.Container>;

/**
 * Pixi implementation of Importer
 */
export default class Pixi extends Importer {

  /**
   * Callback called when any asset added to pixi loader
   */
  public onAddLoaderAsset: (node: Node, asset: { url: string, name: string }) => void
    = (_node: Node, _asset: { url: string, name: string }) => {};

  /**
   * Callback called when restoring a node to pixi container<br />
   * If null is returned, default initiator creates pixi object.
   */
  public onRestoreNode: (node: Node, resources: any) => any | null | undefined
    = (_n, _r) => { return null; };

  /**
   * Returns atlas resource name with node id
   */
  public getAtlasResourceNameByNodeId(id: string): string { return `${id}_atlas`; }

  /**
   * Returns pixi class as initializer
   */
  public getInitiator(name: string): (node: Node) => any {
    return (_node) => { return new (PIXI as any)[name](); };
  }

  /**
   * Returns if pixi has property with given name
   */
  public hasInitiator(name: string): boolean {
    return PIXI.hasOwnProperty(name);
  }

  /**
   * Import Schema and rebuild runtime node structure.<br />
   * Resources are automatically downloaded.<br />
   * Use createAssetMap if any customized workflow are preffered.
   */
  public import(schema: SchemaJson, callback: (root: any) => void = (_) => {}): any {
    const root = new PIXI.Container();

    // create asset list to download
    const assets: Map<string, { url: string, name: string }> = this.createAssetMap(schema);

    // load if any asset is required
    if (assets.size > 0) {
      assets.forEach((asset) => PIXI.loader.add(asset));

      PIXI.loader.load(() => {
        this.restoreScene(root, schema);
        callback(root);
      });
    } else {
      this.restoreScene(root, schema);
      callback(root);
    }

    return root;
  }

  /**
   * Create asset map from schema.<br />
   * Users can use this method and restoreScene individually to inject custom pipeline.
   */
  public createAssetMap(schema: SchemaJson): Map<string, { url: string, name: string }> {
    // resources
    const assets = new Map<string, { url: string, name: string }>();

    // collect required resource
    for (let i = 0; i < schema.scene.length; i++) {
      let url, name;

      const node = schema.scene[i];
      if (node.spine) {
        // TODO: support spine
        // url  = node.spine.url;
        // name = node.id;
        continue;
      } else if (node.sprite) {
        if (node.sprite.atlasUrl) {
          url  = node.sprite.atlasUrl;
          name = this.getAtlasResourceNameByNodeId(node.id);
        } else {
          url  = node.sprite.url;
          name = node.id;
        }
      } else {
        continue;
      }

      const asset = { url, name };

      // user custom process to modify url or resource name
      this.onAddLoaderAsset(node, asset);

      assets.set(url, asset);
    }

    return assets;
  }

  /**
   * Rstore pixi container to given root container from schema
   */
  public restoreScene(root: PIXI.Container, schema: SchemaJson): void {
    // map all nodes in schema first
    const nodeMap = this.createNodeMap(schema);
    // then instantiate all containers from node map
    const containerMap = this.createContainerMap(nodeMap, PIXI.loader.resources);
    // restore transform in the end
    this.restoreTransform(root, schema, nodeMap, containerMap);
  }

  /**
   * Map all nodes from given schema
   */
  private createNodeMap(schema: SchemaJson): NodeMap {
    const nodeMap = new Map<string, Node>();
    for (let i = 0; i < schema.scene.length; i++) {
      const node = schema.scene[i];
      nodeMap.set(node.id, node);
    }
    return nodeMap;
  }

  /**
   * Create and map all Containers from given nodeMap
   */
  private createContainerMap(nodeMap: NodeMap, resources: any): ContainerMap {
    const containerMap = new Map<string, PIXI.Container>();

    nodeMap.forEach((node, id) => {
      // give prior to user custome initialization
      let object = this.onRestoreNode(node, resources);

      // then process default initialization
      if (!object) {
        object = this.createContainer(node, resources);
      }

      // skip if not supported
      if (!object) {
        return;
      }

      // name with node name if no name given
      if (!object.name) {
        object.name = node.name;
      }

      containerMap.set(id, object);
    });

    return containerMap;
  }

  /**
   * Create container instance from given node<br />
   * Textures in loader.resources may be refered.
   */
  private createContainer(node: Node, resources: any): any {
    let object: any;

    if (node.spine) {
      // TODO: support spine
      // object = new PIXI.spine.Spine(resources[node.id].data);
    } else if (node.sprite) {
      // TODO: base64 image
      if (node.sprite.atlasUrl) {
        object = new PIXI.Sprite(PIXI.Texture.fromFrame(node.sprite.frameName));
      } else if (node.sprite.slice) {
        object = new PIXI.mesh.NineSlicePlane(
          resources[node.id].texture,
          node.sprite.slice.left,
          node.sprite.slice.top,
          node.sprite.slice.right,
          node.sprite.slice.bottom
        );
        object.width  = node.transform.width;
        object.height = node.transform.height;
      } else {
        object = new PIXI.Sprite(resources[node.id].texture);
      }
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

    return object;
  }

  /**
   * Restore transform<br />
   * Process this method after applying textures
   * since bounds can not be calculated properly if no texture are applied.
   */
  private restoreTransform(
    root: PIXI.Container,
    schema: SchemaJson,
    nodeMap: NodeMap,
    containerMap: ContainerMap
  ): void {
    const metadata = schema.metadata;

    // original coordinate system adjustment
    const coordAdjust = {
      x: (metadata.positiveCoord.xRight ? 1 : -1),
      y: (metadata.positiveCoord.yDown  ? 1 : -1)
    };

    // restore transform for each mapped container
    // TODO: should separate restoration of hieralchy and property ?
    containerMap.forEach((container, id) => {
      // node that is not from schema
      const node = nodeMap.get(id);
      if (!node) {
        return;
      }

      // default parent size is the scene size, this will be modified later
      const parentSize = {
        width:  metadata.width,
        height: metadata.height
      };

      const transform = node.transform;

      // container that has no parent is the root element
      if (transform.parent === undefined) {
        root.addChild(container);
      } else {
        const parentContainer = containerMap.get(transform.parent);
        const parentNode      = nodeMap.get(transform.parent);
        // skip if any parent could not be detected
        if (!parentContainer || !parentNode) {
          return;
        }

        // change parentSize with actual parent size
        parentSize.width  = parentNode.transform.width  || 0;
        parentSize.height = parentNode.transform.height || 0;

        parentContainer.addChild(container);
      }

      // default scale is 1/1
      const scale = (transform.scale) ? {
        x: transform.scale.x,
        y: transform.scale.y
      } : { x: 1, y: 1 };

      // transform size has higher priority than container size
      const containerSize = {
        width:  (transform.width  === undefined) ? container.width  : transform.width,
        height: (transform.height === undefined) ? container.height : transform.height
      };

      // calculate corrdinate
      const position = {
        x: transform.x * coordAdjust.x,
        y: transform.y * coordAdjust.y
      };
      position.x += (parentSize.width  - containerSize.width  * scale.x) * transform.anchor.x;
      position.y += (parentSize.height - containerSize.height * scale.y) * transform.anchor.y;

      // pixi rotation is presented in radian
      const rotation = (transform.rotation) ? transform.rotation * DEGREE_TO_RADIAN : 0;

      // consider anchor
      if ((container as PIXI.Sprite).anchor) {
        (container as PIXI.Sprite).anchor.set(transform.anchor.x, transform.anchor.y);
        position.x += containerSize.width  * scale.x * transform.anchor.x;
        position.y += containerSize.height * scale.y * transform.anchor.y;
      }

      // assign every thing
      container.position.set(position.x, position.y);
      container.scale.set(scale.x, scale.y);
      container.rotation = rotation;
    });
  }
}
