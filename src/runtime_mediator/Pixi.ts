import { Container } from 'pixi.js';
import IntermediateDtoSchema from 'interfaces/IntermediateDtoSchema';
import RuntimeMediator from 'runtime_mediator/RuntimeMediator';

/**
 * Pixi implementation of RuntimeMediator
 */
export default class Pixi extends RuntimeMediator {
  /**
   * Initiators should not be an instance property.
   */
  public static Initiators: { [key: string]: Function } = {
    // Text requires constructor arguments.
    Text: (Klass: any, properties: { [key: string]: any }) => {
      return new Klass(properties._text, properties._style);
    }
  };

  /**
   * Returns singleton Pixi.Initiators to allow user modification.
   */
  public getInitiators(): { [key: string]: Function } {
    return Pixi.Initiators;
  }

  public createSchema(base: any): IntermediateDtoSchema {
    const dto: IntermediateDtoSchema = {
      constructorClass: (base as Container).constructor,
      name:             (base as Container).name,
      children:         [],
      properties:       {}
    };

    // Iterate with for..in to crawl all properties includes prototype
    for (const key in base) {
      // TODO: Is function neccesary ?
      // Scene graph has responsibility to store and restore scene structure,
      // but not to runtime object.
      dto.properties[key] = base[key];
    }

    return dto;
  }

  public createSchemaRecursive(node: any): IntermediateDtoSchema {
    const schema = this.createSchema(node);

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const child = this.createSchemaRecursive(node.children[i]);
        // use scene graph system for children
        child.children = [];

        schema.children.push(child);
      }
    }

    return schema;
  }

  /**
   * TODO: When importing the objects that exported from the scene graph
   * built from manipulated script, it may have problems below.<br />
   * <br />
   * 1. There is no way to know the proper constructor params.<br />
   *    this causes error when cpnstructor validates the arguments.<br />
   *    This problem is currently solved by defining initiators.<br />
   * 2. Exporter can not identify the node(s) added in constructor.<br />
   *    It causes duplicate instantiation.
   */
  public import(dto: IntermediateDtoSchema): any {
    // TODO: are constructor arguments neccesary ?
    let entity;
    const Klass = dto.constructorClass;

    if (Pixi.Initiators.hasOwnProperty(Klass.name)) {
      entity = Pixi.Initiators[Klass.name](Klass, dto.properties as any);
    } else {
      entity = new dto.constructorClass();
    }

    entity.name = dto.name;

    const properties = Object.keys(dto.properties);
    for (let j = 0; j < properties.length; j++) {
      const property = properties[j];

      // use scene graph system for children
      if (property === 'children') {
        continue;
      }

      try {
        entity[property] = dto.properties[property];
      } catch (e) {
        // TODO: Identify error caused by accessor
        // Other error can not be passed
        console.log(e);
      }
    }

    if (!entity) {
      throw new Error(
        'Restoring runtime object failed. ' +
        `Could not instantiate '${dto.constructorClass.name}'`
      );
    }

    for (let j = 0; j < dto.children.length; j++) {
      entity.addChild(this.import(dto.children[j]));
    }

    return entity;
  }
}
