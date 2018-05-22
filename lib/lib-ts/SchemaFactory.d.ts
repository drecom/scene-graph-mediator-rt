import Schema from 'interfaces/Schema';
import Node from 'interfaces/Node';
export default class SchemaFactory {
    private static singletonInstance;
    private factoryLines;
    static readonly instance: SchemaFactory;
    constructor();
    static addFactoryLine(schemaId: string, line: (base: Node) => Schema): void;
    static create<AppSchema extends Schema>(schemaId: string, entity: Node): Schema;
    static createRecursive<AppSchema extends Schema>(schemaId: string, entity: Node, childNodesGetter: (entity: any) => any[] | null): Schema;
}
