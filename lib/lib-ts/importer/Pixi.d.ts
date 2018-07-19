import { SchemaJson, Node } from '@drecom/scene-graph-schema';
import Importer from 'importer/Importer';
/**
 * Pixi implementation of RuntimeMediator
 */
export default class Pixi extends Importer {
    getInitiator(name: string): (node: Node) => any;
    hasInitiator(name: string): boolean;
    import(schema: SchemaJson, callback?: (root: any) => void): any;
    private restoreScene;
    private restoreNodeWithResource;
}
