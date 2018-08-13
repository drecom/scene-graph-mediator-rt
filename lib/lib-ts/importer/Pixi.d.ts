/// <reference types="pixi.js" />
import { SchemaJson, Node } from '@drecom/scene-graph-schema';
import Importer from 'importer/Importer';
/**
 * Pixi implementation of Importer
 */
export default class Pixi extends Importer {
    /**
     * Callback called when any asset added to pixi loader
     */
    onAddLoaderAsset: (node: Node, asset: {
        url: string;
        name: string;
    }) => void;
    /**
     * Callback called when restoring a node to pixi container<br />
     * If null is returned, default initiator creates pixi object.
     */
    onRestoreNode: (node: Node, resources: any) => any | null | undefined;
    /**
     * Returns atlas resource name with node id
     */
    getAtlasResourceNameByNodeId(id: string): string;
    /**
     * Returns pixi class as initializer
     */
    getInitiator(name: string): (node: Node) => any;
    /**
     * Returns if pixi has property with given name
     */
    hasInitiator(name: string): boolean;
    /**
     * Import Schema and rebuild runtime node structure.<br />
     * Resources are automatically downloaded.<br />
     * Use createAssetMap if any customized workflow are preffered.
     */
    import(schema: SchemaJson, callback?: (root: any) => void): any;
    /**
     * Create asset map from schema.<br />
     * Users can use this method and restoreScene individually to inject custom pipeline.
     */
    createAssetMap(schema: SchemaJson): Map<string, {
        url: string;
        name: string;
    }>;
    /**
     * Rstore pixi container to given root container from schema
     */
    restoreScene(root: PIXI.Container, schema: SchemaJson): void;
    /**
     * Map all nodes from given schema
     */
    private createNodeMap;
    /**
     * Create and map all Containers from given nodeMap
     */
    private createContainerMap;
    /**
     * Create container instance from given node<br />
     * Textures in loader.resources may be refered.
     */
    private createContainer;
    /**
     * Restore transform<br />
     * Process this method after applying textures
     * since bounds can not be calculated properly if no texture are applied.
     */
    private restoreTransform;
}
