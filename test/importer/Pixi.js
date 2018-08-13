import assert from 'power-assert';
import { spy } from 'sinon';
import 'pixi.js';
import Pixi from 'importer/Pixi';

const parentTestName = 'parentTestName';
const childTestName  = 'childTestName';
const testSpriteUrl  = 'http://127.0.0.1/dummyImage.png';

function clearCache() {
  PIXI.loader.resources = {};
  PIXI.Texture.removeFromCache(parentTestName);
  PIXI.Texture.removeFromCache(childTestName);
  PIXI.Texture.removeFromCache(testSpriteUrl);
  PIXI.BaseTexture.removeFromCache(parentTestName);
  PIXI.BaseTexture.removeFromCache(childTestName);
  PIXI.BaseTexture.removeFromCache(testSpriteUrl);
}

describe('Pixi', () => {
  describe('import', () => {
    const pixi = new Pixi();

    // fixtures
    const parentNode = {
      constructorName: 'Container',
      id:   parentTestName,
      name: parentTestName,
      transform: {
        x: 10,
        y: 10,
        children: [ childTestName ],
        anchor: {
          x: 0,
          y: 0
        }
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
        children: [],
        anchor: {
          x: 0,
          y: 0
        }
      }
    };
    const spriteNode = {
      constructorName: 'Sprite',
      id:   parentTestName,
      name: parentTestName,
      transform: {
        x: 30,
        y: 30,
        children: [],
        anchor: {
          x: 0,
          y: 0
        }
      },
      sprite: {
        url: testSpriteUrl
      }
    };
    const sliceNode = {
      constructorName: 'Sprite',
      id:   parentTestName,
      name: parentTestName,
      transform: {
        x: 0,
        y: 0,
        children: [],
        anchor: {
          x: 0,
          y: 0
        }
      },
      sprite: {
        url: testSpriteUrl,
        slice: {
          top:    10,
          bottom: 20,
          left:   30,
          right:  40
        }
      }
    };
    const textNode = {
      constructorName: 'Text',
      id:   parentTestName,
      name: parentTestName,
      transform: {
        x: 0,
        y: 0,
        anchor: {
          x: 0,
          y: 0
        }
      },
      text: {
        text: 'text text'
      }
    };
    const metadata = {
      width:  640,
      height: 1136,
      positiveCoord: {
        xRight: true,
        yDown:  true
      }
    };

    const graph = {
      scene: [ parentNode, childNode ],
      metadata: metadata
    };

    it ('should create anonymouse root Container', () => {
      const root = pixi.import({
        scene: [],
        metadata: metadata
      });

      assert.strictEqual(root.children.length, 0);
      assert.strictEqual(root.constructor.name, 'Container');
    });

    describe('when schema does not contain resource info', () => {
      it ('should restore scene immediately', () => {
        const callbackSpy = spy();

        const root = pixi.import({
          scene: [ parentNode, childNode ],
          metadata: metadata
        }, callbackSpy);

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
      it ('should not restore scene immediately', (done) => {
        const callbackSpy = spy();

        const root = pixi.import({
          scene: [ spriteNode ],
          metadata: metadata
        }, () => {
          callbackSpy();
          clearCache();
          done();
        });

        assert.strictEqual(callbackSpy.getCalls().length, 0);
        assert.strictEqual(root.children.length, 0);
      });

      describe('if schema contains sprite', () => {
        it ('should instantiate Sprite', (done) => {
          pixi.import({
            scene: [ spriteNode ],
            metadata: metadata
          }, (root) => {
            assert.strictEqual(root.children[0].constructor.name, 'Sprite');
            clearCache();
            done();
          });
        });
        describe('if sprite node contains slice', () => {
          it ('should instantiate mesh.NineSlicePlane', (done) => {
            pixi.import({
              scene: [ sliceNode ],
              metadata: metadata
            }, (root) => {
              assert.strictEqual(root.children[0].constructor.name, 'NineSlicePlane');
              clearCache();
              done();
            });
          });
        });
      });
      describe('if schema contains text', () => {
        it ('should instantiate Text', (done) => {
          pixi.import({
            scene: [ textNode ],
            metadata: metadata
          }, (root) => {
            assert.strictEqual(root.children[0].constructor.name, 'Text');
            assert.strictEqual(root.children[0].text, textNode.text.text);
            clearCache();
            done();
          });
        });
      });
    });
  });
});
