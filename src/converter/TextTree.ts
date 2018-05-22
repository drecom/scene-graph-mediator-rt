import IntermediateDtoSchema from 'interfaces/IntermediateDtoSchema';
import Converter from 'interfaces/Converter';
import Level from 'Level';

export default class TextTree implements Converter<string> {

  private graph!: IntermediateDtoSchema;

  constructor(graph: IntermediateDtoSchema) {
    this.graph = graph;
  }

  public convert(level: number, depth?: boolean[], graph?: IntermediateDtoSchema): string | null {
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

  public convertAsSummary(depth?: boolean[], graph?: IntermediateDtoSchema): string {
    const baseGraph = graph || this.graph;
    const baseDepth = depth || [];

    let out = '';
    out += this.convertAsSummaryLine(baseDepth, baseGraph);

    baseDepth.push(true);
    for (let i = 0; i < baseGraph.children.length; i++) {
      baseDepth[baseDepth.length - 1] = (i < (baseGraph.children.length - 1));
      out += this.convertAsSummary(baseDepth, baseGraph.children[i]);
    }
    baseDepth.pop();

    return out;
  }

  public convertAsDetail(_depth?: boolean[], _graph?: IntermediateDtoSchema): string {
    // not supported
    return '';
  }

  private convertAsSummaryLine(depth: boolean[], graph: IntermediateDtoSchema): string {
    let dest = '';

    for (let i = 0; i < depth.length; i++) {
      dest += '  ';
      dest += (depth[i]) ? '|' : ' ';
    }

    dest += `- ${graph.name || ''}(${graph.constructorClass.name})\n`;
    return dest;
  }
}
