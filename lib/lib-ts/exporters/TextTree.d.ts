import Schema from 'interfaces/Schema';
export default class TextTree {
    private dto;
    constructor(dto: Schema);
    convert(level: number): void;
    convertAsSummary(depth?: boolean[], dto?: Schema): string;
    convertAsSummaryLine(depth: boolean[], dto: Schema): string;
}
