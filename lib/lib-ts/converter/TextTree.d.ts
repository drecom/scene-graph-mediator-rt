import IntermediateDtoSchema from 'interfaces/IntermediateDtoSchema';
import Converter from 'interfaces/Converter';
export default class TextTree implements Converter<string> {
    private graph;
    constructor(graph: IntermediateDtoSchema);
    convert(level: number, depth?: boolean[], graph?: IntermediateDtoSchema): string | null;
    convertAsSummary(depth?: boolean[], graph?: IntermediateDtoSchema): string;
    convertAsDetail(_depth?: boolean[], _graph?: IntermediateDtoSchema): string;
    private convertAsSummaryLine(depth, graph);
}
