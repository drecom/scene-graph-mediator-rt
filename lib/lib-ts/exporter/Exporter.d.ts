import { SchemaJson, Node } from '@drecom/scene-graph-schema';
/**
 * Abstract class for runtime mediation.<br />
 * It handles runtime object like Unity's GameObject or Cocos's Node
 */
export default abstract class Exporter {
    /**
     * Export current runtime node structure to desired format
     * like text tree or raw intermediates.<br />
     * FIXME: Child node(s) added in constructor may duplicate.
     */
    export(rootNode: any, width: number, height: number): SchemaJson;
    /**
     * Create Schema from base object.
     */
    abstract createSchema(base: any, width: number, height: number): SchemaJson;
    /**
     * Create Node from base object.
     */
    abstract createNode(base: any): Node;
}
