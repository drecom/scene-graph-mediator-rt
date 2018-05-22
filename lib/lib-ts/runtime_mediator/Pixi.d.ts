import IntermediateDtoSchema from 'interfaces/IntermediateDtoSchema';
import RuntimeMediator from 'runtime_mediator/RuntimeMediator';
/**
 * Pixi implementation of RuntimeMediator
 */
export default class Pixi extends RuntimeMediator {
    /**
     * Initiators should not be an instance property.
     */
    static Initiators: {
        [key: string]: Function;
    };
    /**
     * Returns singleton Pixi.Initiators to allow user modification.
     */
    getInitiators(): {
        [key: string]: Function;
    };
    createSchema(base: any): IntermediateDtoSchema;
    createSchemaRecursive(node: any): IntermediateDtoSchema;
    /**
     * TODO: When importing the objects that exported from the scene graph
     * built from manipulated script, it may have problems below.<br />
     * <br />
     * 1. There is no way to know the proper constructor params.<br />
     *    this causes error when cpnstructor validates the arguments.<br />
     *    This problem is currently solved by defining initiators.<br />
     * 2. Exporter can not identify the node(s) added in constructor.<br />
     *    It causes duplicate instantiation.
     */
    import(dto: IntermediateDtoSchema): any;
}
