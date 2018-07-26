# scene-graph-mediator-rt

This module converts both _intermediate dto schema_ and runtime object each other.
Each of converters should know runtime object schema so this module provides _pixi.js_ mediator by default.

Scene graph applies _scene graph intermediate dto schema_ for data transportation.

# Remarks

Currently this module contains a _scene graph intermediate dto schema_, converters and runtime mediators to make it standalone.
Those three components will be separated to be enabled to develop individually in the future.
