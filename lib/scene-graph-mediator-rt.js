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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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

/***/ "./src/exporter/Exporter.ts":
/*!**********************************!*\
  !*** ./src/exporter/Exporter.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Abstract class for runtime mediation.<br />
 * It handles runtime object like Unity's GameObject or Cocos's Node
 */
var Exporter = /** @class */ (function () {
    function Exporter() {
    }
    /**
     * Export current runtime node structure to desired format
     * like text tree or raw intermediates.<br />
     * FIXME: Child node(s) added in constructor may duplicate.
     */
    Exporter.prototype.export = function (rootNode, width, height) {
        return this.createSchema(rootNode, width, height);
    };
    return Exporter;
}());
/* harmony default export */ __webpack_exports__["default"] = (Exporter);


/***/ }),

/***/ "./src/exporter/Pixi.ts":
/*!******************************!*\
  !*** ./src/exporter/Pixi.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var exporter_Exporter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! exporter/Exporter */ "./src/exporter/Exporter.ts");
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
 * Abstract class for runtime mediation.<br />
 * It handles runtime object like Unity's GameObject or Cocos's Node
 */
var Pixi = /** @class */ (function (_super) {
    __extends(Pixi, _super);
    function Pixi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pixi.prototype.createSchema = function (scene, width, height) {
        var root = {
            scene: this.createNodeRecursive(scene),
            metadata: {
                width: width,
                height: height,
                positiveCoord: {
                    xRight: true,
                    yDown: true
                }
            }
        };
        return root;
    };
    Pixi.prototype.createNode = function (base) {
        var className = base.constructor.name;
        var node = {
            id: base.name,
            name: base.name,
            constructorName: className,
            transform: {
                x: base.position.x,
                y: base.position.y,
                anchor: {
                    x: 0,
                    y: 0
                }
            }
        };
        if (base.parent) {
            node.transform.parent = base.parent.name;
        }
        if (base.children) {
            node.transform.children = [];
            for (var i = 0; i < base.children.length; i++) {
                node.transform.children.push(base.children[i].name);
            }
        }
        switch (className) {
            case 'Spine': break; // TODO:
            case 'Sprite': {
                // TODO: base64 image
                node.sprite = {
                    url: base.texture.baseTexture.imageUrl
                };
                break;
            }
            case 'Text': {
                node.text = {
                    text: base.text,
                    style: {
                        size: base.style.fontSize,
                        color: base.style.fill
                    }
                };
                break;
            }
        }
        // extras
        node.properties = {};
        // for..in iterator crawls all properties includes prototype
        var keys = Object.keys(base);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = base[key];
            var valueType = typeof value;
            // restrict to JSON types
            if (valueType === 'string' || valueType === 'number' || valueType === 'boolean') {
                node.properties[key] = value;
            }
        }
        return node;
    };
    Pixi.prototype.createNodeRecursive = function (base) {
        var nodes = [];
        nodes.push(this.createNode(base));
        if (base.children) {
            for (var i = 0; i < base.children.length; i++) {
                nodes = nodes.concat(this.createNodeRecursive(base.children[i]));
            }
        }
        return nodes;
    };
    return Pixi;
}(exporter_Exporter__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Pixi);


/***/ }),

/***/ "./src/importer/Importer.ts":
/*!**********************************!*\
  !*** ./src/importer/Importer.ts ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Abstract class for runtime mediation.<br />
 * It handles runtime object like Unity's GameObject or Cocos's Node
 */
var Importer = /** @class */ (function () {
    function Importer() {
    }
    /**
     * Returns initiate methods related to class name.<br />
     * Often it is used to define initiation of a class instance
     * with constructor that has argument.<br />
     * Initiators are defined in each runtime implementation and it should be augmented by user.<br />
     * Remarks: This is an experimental design and may be changed in the future.
     */
    Importer.prototype.getInitiator = function (_name) {
        return function () { };
    };
    Importer.prototype.hasInitiator = function (_name) {
        return false;
    };
    return Importer;
}());
/* harmony default export */ __webpack_exports__["default"] = (Importer);


/***/ }),

/***/ "./src/importer/Pixi.ts":
/*!******************************!*\
  !*** ./src/importer/Pixi.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var importer_Importer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! importer/Importer */ "./src/importer/Importer.ts");
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

var TO_RADIAN = Math.PI / 180;
/**
 * Pixi implementation of RuntimeMediator
 */
var Pixi = /** @class */ (function (_super) {
    __extends(Pixi, _super);
    function Pixi() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pixi.prototype.getInitiator = function (name) {
        return function (_node) { return new PIXI[name](); };
    };
    Pixi.prototype.hasInitiator = function (name) {
        return PIXI.hasOwnProperty(name);
    };
    Pixi.prototype.import = function (schema, callback) {
        var _this = this;
        if (callback === void 0) { callback = function (_) { }; }
        var root = new PIXI.Container();
        // resources
        var assets = [];
        for (var i = 0; i < schema.scene.length; i++) {
            var node = schema.scene[i];
            if (node.spine) {
                assets.push({ url: node.spine.url, name: node.id });
            }
            else if (node.sprite) {
                assets.push({ url: node.sprite.url, name: node.id });
                if (node.sprite.atlasUrl) {
                    assets.push({ url: node.sprite.atlasUrl, name: node.id + "_atlas" });
                }
            }
        }
        if (assets.length > 0) {
            PIXI.loader.add(assets).load(function () {
                _this.restoreScene(root, schema);
                callback(root);
            });
        }
        else {
            this.restoreScene(root, schema);
            callback(root);
        }
        return root;
    };
    Pixi.prototype.restoreScene = function (root, schema) {
        var resources = PIXI.loader.resources;
        // create Map
        var nodeMap = new Map();
        for (var i = 0; i < schema.scene.length; i++) {
            var node = schema.scene[i];
            nodeMap.set(node.id, node);
        }
        var containerMap = this.createContainers(nodeMap, resources);
        this.restoreTransform(root, schema, nodeMap, containerMap);
    };
    Pixi.prototype.createContainers = function (nodeMap, resources) {
        var _this = this;
        var containerMap = new Map();
        nodeMap.forEach(function (node, id) {
            var object;
            if (node.spine) {
                // object = new PIXI.spine.Spine(resources[node.id].data);
            }
            else if (node.sprite) {
                // TODO: base64 image
                var texture = resources[node.id].texture;
                if (node.sprite.atlasUrl) {
                    // TODO: choose texture atlas parser and create texture for frame
                }
                object = new PIXI.Sprite(texture);
            }
            else if (node.text) {
                var style = new PIXI.TextStyle({});
                if (node.text.style) {
                    style.fontSize = node.text.style.size || 26;
                    style.fill = node.text.style.color || 'black';
                    switch (node.text.style.horizontalAlign) {
                        case 2:
                            style.align = 'right';
                            break;
                        case 1:
                            style.align = 'center';
                            break;
                        case 0:
                        default:
                            style.align = 'left';
                            break;
                    }
                }
                object = new PIXI.Text(node.text.text || '', style);
            }
            else if (_this.hasInitiator(node.constructorName)) {
                object = _this.getInitiator(node.constructorName)(node);
            }
            else {
                object = new PIXI.Container();
            }
            if (!object) {
                return;
            }
            object.name = node.name;
            containerMap.set(id, object);
        });
        return containerMap;
    };
    Pixi.prototype.restoreTransform = function (root, schema, nodeMap, containerMap) {
        var metadata = schema.metadata;
        var coordMul = {
            x: (metadata.positiveCoord.xRight ? 1 : -1),
            y: (metadata.positiveCoord.yDown ? 1 : -1)
        };
        containerMap.forEach(function (container, id) {
            var node = nodeMap.get(id);
            if (!node) {
                return;
            }
            var parentSize = {
                width: metadata.width,
                height: metadata.height
            };
            var transform = node.transform;
            if (transform.parent === undefined) {
                root.addChild(container);
            }
            else {
                var parentContainer = containerMap.get(transform.parent);
                var parentNode = nodeMap.get(transform.parent);
                if (!parentContainer || !parentNode) {
                    return;
                }
                parentSize.width = parentNode.transform.width || 0;
                parentSize.height = parentNode.transform.height || 0;
                parentContainer.addChild(container);
            }
            var containerSize = {
                width: (transform.width === undefined) ? container.width : transform.width,
                height: (transform.height === undefined) ? container.height : transform.height
            };
            var scale = (transform.scale) ? {
                x: transform.scale.x,
                y: transform.scale.y
            } : { x: 1, y: 1 };
            var rotation = (transform.rotation) ? transform.rotation * TO_RADIAN : 0;
            container.scale.set(scale.x, scale.y);
            container.rotation = rotation;
            var x = transform.x * coordMul.x;
            var y = transform.y * coordMul.y;
            x += (parentSize.width - containerSize.width * scale.x) * transform.anchor.x;
            y += (parentSize.height - containerSize.height * scale.y) * transform.anchor.y;
            if (container.anchor) {
                container.anchor.set(transform.anchor.x, transform.anchor.y);
                x += containerSize.width * scale.x * transform.anchor.x;
                y += containerSize.height * scale.y * transform.anchor.y;
            }
            container.position.set(x, y);
        });
    };
    return Pixi;
}(importer_Importer__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Pixi);


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: Importer, Exporter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var importer_Pixi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! importer/Pixi */ "./src/importer/Pixi.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Importer", function() { return importer_Pixi__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var exporter_Pixi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! exporter/Pixi */ "./src/exporter/Pixi.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Exporter", function() { return exporter_Pixi__WEBPACK_IMPORTED_MODULE_1__["default"]; });

// tslint:disable-next-line import-name

// tslint:disable-next-line import-name




/***/ })

/******/ });
});
//# sourceMappingURL=scene-graph-mediator-rt.js.map