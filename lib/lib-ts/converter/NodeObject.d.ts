import IntermediateSchema from 'interfaces/IntermediateSchema';
import Converter from 'interfaces/Converter';
export default class NodeObject implements Converter<IntermediateSchema> {
    private graph;
    constructor(graph: IntermediateSchema);
    convert(level: number, depth?: boolean[], graph?: IntermediateSchema): IntermediateSchema;
    convertAsSummary(depth?: boolean[], graph?: IntermediateSchema): IntermediateSchema;
}
