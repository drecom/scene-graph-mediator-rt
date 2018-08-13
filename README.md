# scene-graph-mediator-rt

This module converts both scene graph schema and runtime object each other.
Each of converters should know runtime object schema, this module provides (pixi.js)[https://github.com/pixijs/pixi.js] importer/exporter by default.

The schema definition of scene graph is based on (@drecom/scene-graph-schema)[https://github.com/drecom/scene-graph-schema] .

# Remarks

To shrink runtime code volume, importer/exporter for each runtime may separated from this repository in the future.
