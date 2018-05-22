import IntermediateDtoSchema from 'interfaces/IntermediateDtoSchema';
/**
 * Interface for converter.<br />
 * Conversion methods should be provided by convert level.
 */
export default interface Converter<T> {
    /**
     * General interface for conversion.
     */
    convert(level: number, depth?: boolean[], graph?: IntermediateDtoSchema): T | null;
    /**
     * One of conversion methods to summarize.<br />
     * Define this in interface to let implementations have responsibility to have this.
     */
    convertAsSummary(depth?: boolean[], graph?: IntermediateDtoSchema): T;
    /**
     * One of conversion methods to return detailed conversion artifact.<br />
     * Define this in interface to let implementations have responsibility to have this.
     */
    convertAsDetail(depth?: boolean[], graph?: IntermediateDtoSchema): T;
}
