import { SchemaJson, Node } from '@drecom/scene-graph-schema';

export type ImportOption = {
  autoCoordinateFix: boolean
};

/**
 * Abstract class for runtime mediation.<br />
 * It handles runtime object like Unity's GameObject or Cocos's Node
 */
export abstract class Importer {
  /**
   * Returns initiate methods related to class name.<br />
   * Often it is used to define initiation of a class instance
   * with constructor that has argument.<br />
   * Initiators are defined in each runtime implementation and it should be augmented by user.<br />
   * Remarks: This is an experimental design and may be changed in the future.
   */
  public getInitiator(_name: string): (node: Node) => any {
    return () => {};
  }
  /**
   * Returns initiator exists
   */
  public hasInitiator(_name: string): boolean {
    return false;
  }

  /**
   * Import Schema and rebuild runtime node structure.
   */
  abstract import(schema: SchemaJson, callback: (root: any) => void): any;
  abstract createAssetMap(schema: SchemaJson): Map<string, any>;
  abstract restoreScene(root: any, schema: SchemaJson, option: ImportOption): void;
}
