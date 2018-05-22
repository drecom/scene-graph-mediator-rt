import IntermediateDtoSchema from 'interfaces/IntermediateDtoSchema';
import Converter from 'interfaces/Converter';
import Level from 'Level';

/**
 * Converter implementation for IntermediateDto
 */
export default class IntermediateDto implements Converter<IntermediateDtoSchema> {

  private graph!: IntermediateDtoSchema;

  constructor(graph: IntermediateDtoSchema) {
    this.graph = graph;
  }

  public convert(level: number, depth?: boolean[], graph?: IntermediateDtoSchema)
    : IntermediateDtoSchema | null {
    let result = null;
    switch (level) {
      case Level.SUMMARY: {
        result = this.convertAsSummary(depth, graph);
        break;
      }
      case Level.DETAIL: {
        result = this.convertAsDetail(depth, graph);
        break;
      }
      default: break;
    }

    return result;
  }

  public convertAsSummary(depth?: boolean[], graph?: IntermediateDtoSchema): IntermediateDtoSchema {
    const baseGraph = graph || this.graph;
    const baseDepth = depth || [];

    // Following lines do the same process as just returning graph.
    // IntermediateDtoSchema is expected to have more properties in the future.
    // leave these lines to virtualy shrinking IntermediateDtoSchema properties.

    const summary: IntermediateDtoSchema = {
      constructorClass: baseGraph.constructorClass,
      name:             baseGraph.name,
      children:         baseGraph.children,
      properties:       baseGraph.properties
    };

    for (let i = 0; i < summary.children.length; i++) {
      summary.children[i] = this.convertAsSummary(baseDepth, summary.children[i]);
    }

    return summary;
  }

  public convertAsDetail(_depth?: boolean[], graph?: IntermediateDtoSchema): IntermediateDtoSchema {
    return graph || this.graph;
  }
}
