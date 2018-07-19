import assert from 'power-assert';
import { spy } from 'sinon';
import 'pixi.js';
import Importer from 'importer/Pixi';

describe('Importer', () => {
  describe('import', () => {
    const pixi = new Importer();

    // fixtures
    const parentTestName = 'parentTestName';
    const childTestName  = 'childTestName';

    const parentNode = {
      constructorName: 'Container',
      id:   parentTestName,
      name: parentTestName,
      transform: {
        x: 10,
        y: 10,
        children: [ childTestName ]
      }
    };
    const childNode = {
      constructorName: 'Container',
      id:   childTestName,
      name: childTestName,
      transform: {
        x: 20,
        y: 20,
        parent:   parentTestName,
        children: []
      }
    };
    const spriteNode = {
      constructorName: 'Sprite',
      id:   childTestName,
      name: childTestName,
      transform: {
        x: 30,
        y: 30,
        parent:   parentTestName,
        children: [],
      },
      sprite: {
        url: 'http://127.0.0.1/dummyImage.png'
      }
    };

    const graph = {
      scene: [ parentNode, childNode ]
    };
    const graphWithResource = {
      scene: [ parentNode, spriteNode ]
    };

    describe('when schema does not contain resource info', () => {
      it ('should restore scene immediately', () => {
        const callbackSpy = spy();

        const root = pixi.import(graph, callbackSpy);

        assert.ok(callbackSpy.calledOnce);

        assert.strictEqual(root.children.length, 1);

        const parentContainer = root.children[0];

        assert.strictEqual(parentContainer.children.length, 1);

        const childContainer = parentContainer.children[0];

        assert.strictEqual(parentContainer.constructor.name, parentNode.constructorName);
        assert.strictEqual(childContainer.constructor.name,  childNode.constructorName);

        assert.strictEqual(parentContainer.name, parentNode.name);
        assert.strictEqual(childContainer.name,  childNode.name);

        assert.strictEqual(parentContainer.position.x, parentNode.transform.x);
        assert.strictEqual(parentContainer.position.y, parentNode.transform.y);
        assert.strictEqual(childContainer.position.x, childNode.transform.x);
        assert.strictEqual(childContainer.position.y, childNode.transform.y);
      });
    });
    describe('when schema contains resource info', () => {
      it ('should not restore scene immediately', () => {
        const callbackSpy = spy();

        const root = pixi.import(graphWithResource, callbackSpy);

        assert.strictEqual(callbackSpy.getCalls().length, 0);
        assert.strictEqual(root.children.length, 0);
      });
    });
  });
});
