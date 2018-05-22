/**
 * Intermediate object interface to communicate through
 * runtime and this module.<br />
 * Scene graph does not handle any object which defined
 * in runtime except runtime mediators.<br />
 * This interface must contain runtime node identifier
 * and information about hieralchical node structure.
 */
export default interface IntermediateDtoSchema {
    constructorClass: any;
    name: string | null;
    children: IntermediateDtoSchema[];
    properties: {
        [key: string]: any;
    };
}
