import RuntimeMediator from 'runtime_mediator/RuntimeMediator';
import Pixi from 'runtime_mediator/Pixi';

import Level from 'Level';
import Type from 'Type';

/**
 * SceneGraph provides runtime node mediator.<br />
 * It is not frozen and should be extended.
 */
const SceneGraph: {
  Pixi: typeof RuntimeMediator
} = {
  Pixi
};

const SceneGraphOptions: {
  Level: typeof Level,
  Type: typeof Type
} = {
  Level,
  Type
};

export { SceneGraph, SceneGraphOptions, RuntimeMediator };
