import Schema from 'interfaces/Schema';
import Node from 'interfaces/Node';
import SceneGraphLevel from 'SceneGraphLevel';
import SceneGraphType from 'SceneGraphType';
export default abstract class SceneGraph<AppNode extends Node, AppSchema extends Schema> {
    static readonly Level: typeof SceneGraphLevel;
    static readonly Type: typeof SceneGraphType;
    protected rootNode: AppNode | undefined;
    protected currentSchema: string;
    constructor(schemaId: string, rootNode?: AppNode);
    setRootNode(rootNode: AppNode): void;
    /**
     * Returns copy of current scene graph.<br />
     * Binary won't be copied.
     */
    snapshot(): AppSchema | undefined;
    export(type: number, convertLevel?: number, schema?: AppSchema): string | null;
    exportTextTree(convertLevel?: number, schema?: AppSchema): string;
    protected childNodeGetter(_entity: any): any[] | null;
}
