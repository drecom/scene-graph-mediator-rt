import assert from 'power-assert';
import { spy } from 'sinon';
import 'pixi.js';
import Pixi from 'runtime_mediator/Pixi';

describe('Pixi', () => {
  describe('getInitiators', () => {
    it ('returns object with function value', () => {
      const pixi = new Pixi();
      const initiators = pixi.getInitiators();
      const keys = Object.keys(initiators);
      assert.strictEqual(typeof initiators[keys[0]], "function");
    });
  });
  describe('createSchema', () => {
    it ('create IntermediateDto with pixi Container', () => {
      const testName = 'testName';
      const container = new PIXI.Container();
      container.name = testName;
      const pixi = new Pixi();
      const dto = pixi.createSchema(container);
      assert.strictEqual(dto.name, testName);
      assert.strictEqual(dto.constructorClass.name, PIXI.Container.name);
    });
  });

  describe('createSchemaRecursive', () => {
    it ('', () => {
      const testName      = 'testName';
      const childTestName = 'childTestName';

      const container = new PIXI.Container();
      const child     = new PIXI.Container();

      container.name = testName;
      child.name = childTestName;

      container.addChild(child);

      const pixi = new Pixi();
      const dto = pixi.createSchemaRecursive(container);

      assert.strictEqual(dto.name, testName);
      assert.strictEqual(dto.constructorClass.name, PIXI.Container.name);

      assert.strictEqual(dto.children[0].name, childTestName);
      assert.strictEqual(dto.children[0].constructorClass.name, PIXI.Container.name);
    });
  });
  describe('import', () => {
    it ('', () => {
      const testName      = 'testName';
      const childTestName = 'childTestName';

      const node = {
        constructorClass: PIXI.Container,
        name:             testName,
        children:         [{
          constructorClass: PIXI.Container,
          name:             childTestName,
          children:         [],
          properties:       {}
        }],
        properties: {}
      };

      const pixi = new Pixi();
      const container = pixi.import(node);

      assert.strictEqual(container.name, testName);
      assert.strictEqual(container.constructor.name, PIXI.Container.name);

      assert.strictEqual(container.children[0].name, childTestName);
      assert.strictEqual(container.children[0].constructor.name, PIXI.Container.name);
    });
  });
});
