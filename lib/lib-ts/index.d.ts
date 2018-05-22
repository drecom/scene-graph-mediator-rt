import RuntimeMediator from 'runtime_mediator/RuntimeMediator';
import Level from 'Level';
import Type from 'Type';
/**
 * SceneGraph provides runtime node mediator.<br />
 * It is not frozen and should be extended.
 */
declare const SceneGraph: {
    Pixi: typeof RuntimeMediator;
};
declare const SceneGraphOptions: {
    Level: typeof Level;
    Type: typeof Type;
};
export { SceneGraph, SceneGraphOptions, RuntimeMediator };
