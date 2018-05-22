import assert from 'power-assert';
import { spy } from 'sinon';
import TextTree from 'converter/TextTree';
import Level from 'Level';

describe('TextTree', () => {
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
    it ('returns string when level is SUMMARY', () => {
      const tree = new TextTree(dummyGraph);
      const result = tree.convert(Level.SUMMARY);

      assert.strictEqual(typeof result, "string");
    });
    it ('returns string when level is DETAIL', () => {
      const tree = new TextTree(dummyGraph);
      const result = tree.convert(Level.DETAIL);

      assert.strictEqual(typeof result, "string");
    });
    it ('returns null when level is unknown', () => {
      const testLevel = -1;

      const keys = Object.keys(Level);

      for (let i = 0; i < keys.length; i++) {
        assert.notStrictEqual(Level[keys[i]], testLevel);
      }

      const tree = new TextTree(dummyGraph);
      const result = tree.convert(testLevel);

      assert.strictEqual(result, null);
    });

    it ('relies on convertAsSummary when level is SUMMARY', () => {
      const tree = new TextTree(dummyGraph);
      const stub = spy(tree, 'convertAsSummary');

      tree.convert(Level.SUMMARY);

      assert.strictEqual(stub.getCalls().length > 0, true);
    });
    it ('relies on convertAsSummary when level is DETAIL', () => {
      const tree = new TextTree(dummyGraph);
      const stub = spy(tree, 'convertAsDetail');

      tree.convert(Level.DETAIL);

      assert.strictEqual(stub.calledOnce, true);
    });
  });

  describe('convertAsSummary', () => {
    it ('returns text tree string', () => {
      const tree = new TextTree(dummyGraph);

      const summary = tree.convertAsSummary();
      assert.strictEqual(summary,
        "- 1(Object)\n" +
        "  |- 1_1(Object)\n" +
        "  |  |- 1_1_1(Object)\n" +
        "  |  |  |- 1_1_1_1(Object)\n" +
        "  |  |  |   - 1_1_1_1_1(Object)\n" +
        "  |  |   - 1_1_1_2(Object)\n" +
        "  |   - 1_1_2(Object)\n" +
        "  |      - 1_1_2_1(Object)\n" +
        "   - 1_2(Object)\n" +
        "      - 1_2_1(Object)\n"
      );
    });

    it ('should call convertAsSummaryLine for object count', () => {
      let count = 1;
      const countNode = (node) => {
        count += node.children.length;
        for (let i = 0; i < node.children.length; i++) {
          countNode(node.children[i]);
        }
      }
      countNode(dummyGraph);

      const tree = new TextTree(dummyGraph);
      const stub = spy(tree, 'convertAsSummaryLine');
      const summary = tree.convertAsSummary();
      assert.strictEqual(stub.getCalls().length, count);
    });
  });

  describe('convertAsSummaryLine', () => {
    const testGraph = {
      constructorClass: Object,
      name:'testName',
      children:[]
    };

    it ('contains dto name', () => {
      const tree = new TextTree(testGraph);
      const result = tree.convertAsSummaryLine(1, testGraph);
      assert.strictEqual(result.includes(testGraph.name), true);
    });
    it ('contains dto constructorClass name', () => {
      const tree = new TextTree(testGraph);
      const result = tree.convertAsSummaryLine(1, testGraph);
      assert.strictEqual(result.includes(testGraph.constructorClass.name), true);
    });
  });
  describe('convertAsDetail', () => {
    const testGraph = {
      constructorClass: Object,
      name:'testName',
      children:[]
    };

    it ('not supported currently', () => {
      const tree = new TextTree(testGraph);
      const result = tree.convertAsDetail(1, testGraph);
      assert.strictEqual(result, "");
    });
  });
});
