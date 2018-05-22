import assert from 'power-assert';
import { spy } from 'sinon';
import IntermediateDto from 'converter/IntermediateDto';
import Level from 'Level';

describe('IntermediateDto', () => {
  const dummyGraph = {
    constructorClass: Object,
    name:'1',
    children:[
      {
        constructorClass: Object,
        name:'1_1',
        children:[
          {
            constructorClass: Object,
            name:'1_1_1',
            children:[
              {
                constructorClass: Object,
                name:'1_1_1_1',
                children:[
                  {
                    constructorClass: Object,
                    name:'1_1_1_1_1',
                    children:[]
                  }
                ]
              },
              {
                constructorClass: Object,
                name:'1_1_1_2',
                children:[]
              }
            ]
          },
          {
            constructorClass: Object,
            name:'1_1_2',
            children:[
              {
                constructorClass: Object,
                name:'1_1_2_1',
                children:[]
              }
            ]
          }
        ]
      },
      {
        constructorClass: Object,
        name:'1_2',
        children:[
          {
            constructorClass: Object,
            name:'1_2_1',
            children:[]
          }
        ]
      }
    ]
  };

  describe('convert', () => {
    it ('returns IntermediateDtoSchema when level is SUMMARY', () => {
      const tree = new IntermediateDto(dummyGraph);
      const result = tree.convert(Level.SUMMARY);

      assert.ok(result.constructorClass !== undefined);
      assert.ok(result.name !== undefined);
      assert.ok(result.children !== undefined);
    });
    it ('returns IntermediateDtoSchema when level is DETAIL', () => {
      const tree = new IntermediateDto(dummyGraph);
      const result = tree.convert(Level.DETAIL);

      assert.ok(result.constructorClass !== undefined);
      assert.ok(result.name !== undefined);
      assert.ok(result.children !== undefined);
    });
    it ('returns null when level is unknown', () => {
      const testLevel = -1;

      const keys = Object.keys(Level);

      for (let i = 0; i < keys.length; i++) {
        assert.notStrictEqual(Level[keys[i]], testLevel);
      }

      const tree = new IntermediateDto(dummyGraph);
      const result = tree.convert(testLevel);

      assert.strictEqual(result, null);
    });

    it ('relies on convertAsSummary when level is SUMMARY', () => {
      const tree = new IntermediateDto(dummyGraph);
      const stub = spy(tree, 'convertAsSummary');

      tree.convert(Level.SUMMARY);

      assert.strictEqual(stub.getCalls().length > 0, true);
    });
    it ('relies on convertAsSummary when level is DETAIL', () => {
      const tree = new IntermediateDto(dummyGraph);
      const stub = spy(tree, 'convertAsDetail');

      tree.convert(Level.DETAIL);

      assert.strictEqual(stub.calledOnce, true);
    });
  });

  describe('convertAsSummary', () => {
    it ('returns IntermediateDto', () => {
      const tree = new IntermediateDto(dummyGraph);

      const summary = tree.convertAsSummary();
      assert.strictEqual(summary.name, '1');
      assert.strictEqual(summary.constructorClass.name, 'Object');
      assert.strictEqual(summary.children[0].name, '1_1');
      assert.strictEqual(summary.children[0].constructorClass.name, 'Object');
    });
  });
  describe('convertAsDetail', () => {
    it ('returns IntermediateDto', () => {
      const tree = new IntermediateDto(dummyGraph);

      const summary = tree.convertAsSummary();
      assert.strictEqual(summary.name, '1');
      assert.strictEqual(summary.constructorClass.name, 'Object');
      assert.strictEqual(summary.children[0].name, '1_1');
      assert.strictEqual(summary.children[0].constructorClass.name, 'Object');
    });
  });
});
