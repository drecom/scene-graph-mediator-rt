import IntermediateDtoSchema from 'interfaces/IntermediateDtoSchema';
/**
 * Abstract class for runtime mediation.<br />
 * It handles runtime object like Unity's GameObject or Cocos's Node
 */
export default abstract class RuntimeMediator {
    /**
     * Returns initiate methods related to class name.<br />
     * Often it is used to define initiation of a class instance
     * with constructor that has argument.<br />
     * Initiators are defined in each runtime implementation and it should be augmented by user.<br />
     * Remarks: This is an experimental design and may be changed in the future.
     */
    abstract getInitiators(): {
        [key: string]: Function;
    };
    /**
     * Create IntermediateDtoSchema from base node.
     */
    abstract createSchema(base: any): IntermediateDtoSchema;
    /**
     * Create IntermediateDtoSchema from base node recursively.
     */
    abstract createSchemaRecursive(node: any): IntermediateDtoSchema;
    /**
     * Import IntermediateDtoSchema and rebuild runtime node structure.
     */
    abstract import(dto: IntermediateDtoSchema): any;
    /**
     * Export current runtime node structure to desired format
     * like text tree or raw intermediates.<br />
     * FIXME: Child node(s) added in constructor may duplicate.
     */
    export(type: string, rootNode: any, convertLevel?: number): any;
}
