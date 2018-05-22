export default interface IntermediateSchema {
    constructorName: string;
    name: string | null;
    children: IntermediateSchema[];
}
