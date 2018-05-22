(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["pixi-scene-graph"] = factory();
	else
		root["pixi-scene-graph"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Level.ts":
/*!**********************!*\
  !*** ./src/Level.ts ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Scene graph expression level.<br />
 * All converter must support these levels.
 */
var Level = Object.freeze({
    SUMMARY: 1,
    DETAIL: 2
});
/* harmony default export */ __webpack_exports__["default"] = (Level);


/***/ }),

/***/ "./src/Type.ts":
/*!*********************!*\
  !*** ./src/Type.ts ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Scene graph expression variants.<br />
 * TODO: accept user extension.
 */
var Type = Object.freeze({
    INTERMEDIATE_DTO: 'INTERMEDIATE_DTO',
    TEXT_TREE: 'TEXT_TREE'
});
/* harmony default export */ __webpack_exports__["default"] = (Type);


/***/ }),

/***/ "./src/converter/IntermediateDto.ts":
/*!******************************************!*\
  !*** ./src/converter/IntermediateDto.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Level */ "./src/Level.ts");

/**
 * Converter implementation for IntermediateDto
 */
var IntermediateDto = /** @class */ (function () {
    function IntermediateDto(graph) {
        this.graph = graph;
    }
    IntermediateDto.prototype.convert = function (level, depth, graph) {
        var result = null;
        switch (level) {
            case Level__WEBPACK_IMPORTED_MODULE_0__["default"].SUMMARY: {
                result = this.convertAsSummary(depth, graph);
                break;
            }
            case Level__WEBPACK_IMPORTED_MODULE_0__["default"].DETAIL: {
                result = this.convertAsDetail(depth, graph);
                break;
            }
            default: break;
        }
        return result;
    };
    IntermediateDto.prototype.convertAsSummary = function (depth, graph) {
        var baseGraph = graph || this.graph;
        var baseDepth = depth || [];
        // Following lines do the same process as just returning graph.
        // IntermediateDtoSchema is expected to have more properties in the future.
        // leave these lines to virtualy shrinking IntermediateDtoSchema properties.
        var summary = {
            constructorClass: baseGraph.constructorClass,
            name: baseGraph.name,
            children: baseGraph.children,
            properties: baseGraph.properties
        };
        for (var i = 0; i < summary.children.length; i++) {
            summary.children[i] = this.convertAsSummary(baseDepth, summary.children[i]);
        }
        return summary;
    };
    IntermediateDto.prototype.convertAsDetail = function (_depth, graph) {
        return graph || this.graph;
    };
    return IntermediateDto;
}());
/* harmony default export */ __webpack_exports__["default"] = (IntermediateDto);


/***/ }),

/***/ "./src/converter/TextTree.ts":
/*!***********************************!*\
  !*** ./src/converter/TextTree.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Level */ "./src/Level.ts");

var TextTree = /** @class */ (function () {
    function TextTree(graph) {
        this.graph = graph;
    }
    TextTree.prototype.convert = function (level, depth, graph) {
        var result = null;
        switch (level) {
            case Level__WEBPACK_IMPORTED_MODULE_0__["default"].SUMMARY: {
                result = this.convertAsSummary(depth, graph);
                break;
            }
            case Level__WEBPACK_IMPORTED_MODULE_0__["default"].DETAIL: {
                result = this.convertAsDetail(depth, graph);
                break;
            }
            default: break;
        }
        return result;
    };
    TextTree.prototype.convertAsSummary = function (depth, graph) {
        var baseGraph = graph || this.graph;
        var baseDepth = depth || [];
        var out = '';
        out += this.convertAsSummaryLine(baseDepth, baseGraph);
        baseDepth.push(true);
        for (var i = 0; i < baseGraph.children.length; i++) {
            baseDepth[baseDepth.length - 1] = (i < (baseGraph.children.length - 1));
            out += this.convertAsSummary(baseDepth, baseGraph.children[i]);
        }
        baseDepth.pop();
        return out;
    };
    TextTree.prototype.convertAsDetail = function (_depth, _graph) {
        // not supported
        return '';
    };
    TextTree.prototype.convertAsSummaryLine = function (depth, graph) {
        var dest = '';
        for (var i = 0; i < depth.length; i++) {
            dest += '  ';
            dest += (depth[i]) ? '|' : ' ';
        }
        dest += "- " + (graph.name || '') + "(" + graph.constructorClass.name + ")\n";
        return dest;
    };
    return TextTree;
}());
/* harmony default export */ __webpack_exports__["default"] = (TextTree);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: SceneGraph, SceneGraphOptions, RuntimeMediator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneGraph", function() { return SceneGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SceneGraphOptions", function() { return SceneGraphOptions; });
/* harmony import */ var runtime_mediator_RuntimeMediator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! runtime_mediator/RuntimeMediator */ "./src/runtime_mediator/RuntimeMediator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RuntimeMediator", function() { return runtime_mediator_RuntimeMediator__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var runtime_mediator_Pixi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! runtime_mediator/Pixi */ "./src/runtime_mediator/Pixi.ts");
/* harmony import */ var Level__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! Level */ "./src/Level.ts");
/* harmony import */ var Type__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! Type */ "./src/Type.ts");




/**
 * SceneGraph provides runtime node mediator.<br />
 * It is not frozen and should be extended.
 */
var SceneGraph = {
    Pixi: runtime_mediator_Pixi__WEBPACK_IMPORTED_MODULE_1__["default"]
};
var SceneGraphOptions = {
    Level: Level__WEBPACK_IMPORTED_MODULE_2__["default"],
    Type: Type__WEBPACK_IMPORTED_MODULE_3__["default"]
};



/***/ }),

/***/ "./src/runtime_mediator/Pixi.ts":
/*!**************************************!*\
  !*** ./src/runtime_mediator/Pixi.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var runtime_mediator_RuntimeMediator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! runtime_mediator/RuntimeMediator */ "./src/runtime_mediator/RuntimeMediator.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * Pixi implementation of RuntimeMediator
 */
var Pixi = /** @class */ (function (_super) {
    __extends(Pixi, _super);
    function Pixi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Returns singleton Pixi.Initiators to allow user modification.
     */
    Pixi.prototype.getInitiators = function () {
        return Pixi.Initiators;
    };
    Pixi.prototype.createSchema = function (base) {
        var dto = {
            constructorClass: base.constructor,
            name: base.name,
            children: [],
            properties: {}
        };
        // Iterate with for..in to crawl all properties includes prototype
        for (var key in base) {
            // TODO: Is function neccesary ?
            // Scene graph has responsibility to store and restore scene structure,
            // but not to runtime object.
            dto.properties[key] = base[key];
        }
        return dto;
    };
    Pixi.prototype.createSchemaRecursive = function (node) {
        var schema = this.createSchema(node);
        if (node.children) {
            for (var i = 0; i < node.children.length; i++) {
                var child = this.createSchemaRecursive(node.children[i]);
                // use scene graph system for children
                child.children = [];
                schema.children.push(child);
            }
        }
        return schema;
    };
    /**
     * TODO: When importing the objects that exported from the scene graph
     * built from manipulated script, it may have problems below.<br />
     * <br />
     * 1. There is no way to know the proper constructor params.<br />
     *    this causes error when cpnstructor validates the arguments.<br />
     *    This problem is currently solved by defining initiators.<br />
     * 2. Exporter can not identify the node(s) added in constructor.<br />
     *    It causes duplicate instantiation.
     */
    Pixi.prototype.import = function (dto) {
        // TODO: are constructor arguments neccesary ?
        var entity;
        var Klass = dto.constructorClass;
        if (Pixi.Initiators.hasOwnProperty(Klass.name)) {
            entity = Pixi.Initiators[Klass.name](Klass, dto.properties);
        }
        else {
            entity = new dto.constructorClass();
        }
        entity.name = dto.name;
        var properties = Object.keys(dto.properties);
        for (var j = 0; j < properties.length; j++) {
            var property = properties[j];
            // use scene graph system for children
            if (property === 'children') {
                continue;
            }
            try {
                entity[property] = dto.properties[property];
            }
            catch (e) {
                // TODO: Identify error caused by accessor
                // Other error can not be passed
                console.log(e);
            }
        }
        if (!entity) {
            throw new Error('Restoring runtime object failed. ' +
                ("Could not instantiate '" + dto.constructorClass.name + "'"));
        }
        for (var j = 0; j < dto.children.length; j++) {
            entity.addChild(this.import(dto.children[j]));
        }
        return entity;
    };
    /**
     * Initiators should not be an instance property.
     */
    Pixi.Initiators = {
        // Text requires constructor arguments.
        Text: function (Klass, properties) {
            return new Klass(properties._text, properties._style);
        }
    };
    return Pixi;
}(runtime_mediator_RuntimeMediator__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Pixi);


/***/ }),

/***/ "./src/runtime_mediator/RuntimeMediator.ts":
/*!*************************************************!*\
  !*** ./src/runtime_mediator/RuntimeMediator.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var Level__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Level */ "./src/Level.ts");
/* harmony import */ var Type__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! Type */ "./src/Type.ts");
/* harmony import */ var converter_TextTree__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! converter/TextTree */ "./src/converter/TextTree.ts");
/* harmony import */ var converter_IntermediateDto__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! converter/IntermediateDto */ "./src/converter/IntermediateDto.ts");




/**
 * Abstract class for runtime mediation.<br />
 * It handles runtime object like Unity's GameObject or Cocos's Node
 */
var RuntimeMediator = /** @class */ (function () {
    function RuntimeMediator() {
    }
    /**
     * Export current runtime node structure to desired format
     * like text tree or raw intermediates.<br />
     * FIXME: Child node(s) added in constructor may duplicate.
     */
    RuntimeMediator.prototype.export = function (type, rootNode, convertLevel) {
        if (convertLevel === void 0) { convertLevel = Level__WEBPACK_IMPORTED_MODULE_0__["default"].SUMMARY; }
        var schema = this.createSchemaRecursive(rootNode);
        if (!schema) {
            return null;
        }
        var converter = null;
        switch (type) {
            case Type__WEBPACK_IMPORTED_MODULE_1__["default"].TEXT_TREE:
                converter = new converter_TextTree__WEBPACK_IMPORTED_MODULE_2__["default"](schema);
                break;
            case Type__WEBPACK_IMPORTED_MODULE_1__["default"].INTERMEDIATE_DTO:
                converter = new converter_IntermediateDto__WEBPACK_IMPORTED_MODULE_3__["default"](schema);
                break;
            default: break;
        }
        if (!converter) {
            return null;
        }
        return converter.convert(convertLevel);
    };
    return RuntimeMediator;
}());
/* harmony default export */ __webpack_exports__["default"] = (RuntimeMediator);


/***/ })

/******/ });
});
//# sourceMappingURL=pixi-scene-graph.js.map