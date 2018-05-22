import IntermediateDtoSchema from 'interfaces/IntermediateDtoSchema';
import Converter from 'interfaces/Converter';
/**
 * Converter implementation for IntermediateDto
 */
export default class IntermediateDto implements Converter<IntermediateDtoSchema> {
    private graph;
    constructor(graph: IntermediateDtoSchema);
    convert(level: number, depth?: boolean[], graph?: IntermediateDtoSchema): IntermediateDtoSchema | null;
    convertAsSummary(depth?: boolean[], graph?: IntermediateDtoSchema): IntermediateDtoSchema;
    convertAsDetail(_depth?: boolean[], graph?: IntermediateDtoSchema): IntermediateDtoSchema;
}
