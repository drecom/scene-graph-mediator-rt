/// <reference types="pixi.js" />
import { Container } from 'pixi.js';
import { Pixi as SchemaPixi } from 'schemas/index';
import SceneGraph from 'scene_graph/SceneGraph';
import SceneGraphLevel from 'SceneGraphLevel';
import SceneGraphType from 'SceneGraphType';
export default class PixiSceneGraph extends SceneGraph<Container, SchemaPixi> {
    static readonly Level: typeof SceneGraphLevel;
    static readonly Type: typeof SceneGraphType;
    constructor(rootNode?: Container);
    protected childNodeGetter(entity: any): any[] | null;
}
