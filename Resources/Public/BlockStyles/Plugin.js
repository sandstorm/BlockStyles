/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _neosUiExtensibility = __webpack_require__(2);
	
	var _neosUiExtensibility2 = _interopRequireDefault(_neosUiExtensibility);
	
	var _BlockStyles = __webpack_require__(7);
	
	var _BlockStyles2 = _interopRequireDefault(_BlockStyles);
	
	var _styleDefinitions = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	(0, _neosUiExtensibility2.default)('Sandstorm.BlockStyles', {}, function (globalRegistry, _ref) {
		var frontendConfiguration = _ref.frontendConfiguration;
	
		var stylePresets = frontendConfiguration['Sandstorm.BlockStyles:presets'];
	
		var richtextToolbar = globalRegistry.get('ckEditor').get('richtextToolbar');
		richtextToolbar.set('BlockStyles', {
			component: _BlockStyles2.default,
			callbackPropName: 'onSelect',
			isVisibleWhen: function isVisibleWhen() {
				return true;
			}
		});
	
		var formattingRules = globalRegistry.get('ckEditor').get('formattingRules');
	
		/**
	  * Shorthand add* method to ease creation of custom styles
	  */
		formattingRules.set('Sandstorm.BlockStyles', {
			applyStyleFn: function applyStyleFn(formattingOptions, editor, CKEDITOR) {
				var blockStylePresetName = formattingOptions.blockStylePresetName,
				    styleDefinitionId = formattingOptions.styleDefinitionId,
				    value = formattingOptions.value;
	
	
				var blockStylePreset = stylePresets[blockStylePresetName];
	
				var classesToBePreserved = (0, _styleDefinitions.findAllAppliedClassesExceptForOneStyleDefinition)(styleDefinitionId, blockStylePreset, editor, CKEDITOR);
	
				var style = new CKEDITOR.style({
					element: 'p',
					attributes: {
						class: [].concat(_toConsumableArray(classesToBePreserved), [value]).join(' ')
					}
				});
				editor.applyStyle(style);
			},
			extractCurrentFormatFn: function extractCurrentFormatFn(editor, CKEDITOR) {
				var elementPath = editor.elementPath();
				if (elementPath && elementPath.block) {
					var classNames = elementPath.block.getAttribute('class');
					return { classes: classNames && classNames.split(' ') };
				}
				return null;
			},
			config: function config(configSoFar, formattingEditorOptions) {
				var _ref2;
	
				var blockStylePresetName = formattingEditorOptions;
				var blockStylePreset = stylePresets[blockStylePresetName];
				var classNames = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(Object.keys(blockStylePreset).map(function (k) {
					return Object.keys(blockStylePreset[k].options);
				})));
				return formattingRules.config.addToExtraAllowedContent(classNames.map(function (cssClassName) {
					return 'p(' + cssClassName + ')';
				}).join(';'))(configSoFar);
			}
	
		});
	});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.createConsumerApi = undefined;
	
	var _createConsumerApi = __webpack_require__(3);
	
	var _createConsumerApi2 = _interopRequireDefault(_createConsumerApi);
	
	var _readFromConsumerApi = __webpack_require__(6);
	
	var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _readFromConsumerApi2.default)('manifest');
	exports.createConsumerApi = _createConsumerApi2.default;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = createConsumerApi;
	
	var _package = __webpack_require__(4);
	
	var _manifest = __webpack_require__(5);
	
	var _manifest2 = _interopRequireDefault(_manifest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var createReadOnlyValue = function createReadOnlyValue(value) {
	    return {
	        value: value,
	        writable: false,
	        enumerable: false,
	        configurable: true
	    };
	};
	
	function createConsumerApi(manifests, exposureMap) {
	    var api = {};
	
	    Object.keys(exposureMap).forEach(function (key) {
	        Object.defineProperty(api, key, createReadOnlyValue(exposureMap[key]));
	    });
	
	    Object.defineProperty(api, '@manifest', createReadOnlyValue((0, _manifest2.default)(manifests)));
	
	    Object.defineProperty(window, '@Neos:HostPluginAPI', createReadOnlyValue(api));
	    Object.defineProperty(window['@Neos:HostPluginAPI'], 'VERSION', createReadOnlyValue(_package.version));
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = {"name":"@neos-project/neos-ui-extensibility","version":"1.0.0-beta8","description":"Extensibility mechanisms for the Neos CMS UI","main":"./src/index.js","scripts":{"prebuild":"check-dependencies && yarn clean","test":"yarn jest","test:watch":"yarn jest -- --watch","build":"exit 0","build:watch":"exit 0","clean":"rimraf ./lib ./dist","lint":"eslint src","jest":"PWD=$(pwd) NODE_ENV=test jest -w 1 --coverage"},"dependencies":{"@neos-project/build-essentials":"1.0.0-beta8","@neos-project/positional-array-sorter":"1.0.0-beta8","babel-core":"^6.13.2","babel-eslint":"^7.1.1","babel-loader":"^6.2.4","babel-plugin-transform-decorators-legacy":"^1.3.4","babel-plugin-transform-object-rest-spread":"^6.20.1","babel-plugin-webpack-alias":"^2.1.1","babel-preset-es2015":"^6.13.2","babel-preset-react":"^6.3.13","babel-preset-stage-0":"^6.3.13","chalk":"^1.1.3","css-loader":"^0.26.0","file-loader":"^0.10.0","json-loader":"^0.5.4","postcss-loader":"^1.0.0","react-dev-utils":"^0.5.0","style-loader":"^0.13.1"},"bin":{"neos-react-scripts":"./bin/neos-react-scripts.js"},"jest":{"transformIgnorePatterns":[],"setupFiles":["./node_modules/@neos-project/build-essentials/src/setup-browser-env.js","./node_modules/@neos-project/build-essentials/src/enzymeConfiguration.js"],"transform":{"neos-ui-extensibility/src/.+\\.jsx?$":"./node_modules/.bin/babel-jest","node_modules/@neos-project/.+\\.jsx?$":"./node_modules/.bin/babel-jest"}}}

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	exports.default = function (manifests) {
	    return function manifest(identifier, options, bootstrap) {
	        manifests.push(_defineProperty({}, identifier, {
	            options: options,
	            bootstrap: bootstrap
	        }));
	    };
	};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = readFromConsumerApi;
	function readFromConsumerApi(key) {
	    return function () {
	        if (window['@Neos:HostPluginAPI'] && window['@Neos:HostPluginAPI']['@' + key]) {
	            var _window$NeosHostPlu;
	
	            return (_window$NeosHostPlu = window['@Neos:HostPluginAPI'])['@' + key].apply(_window$NeosHostPlu, arguments);
	        }
	
	        throw new Error('You are trying to read from a consumer api that hasn\'t been initialized yet!');
	    };
	}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _dec, _dec2, _class;
	//import {getGuestFrameWindow} from '@neos-project/neos-ui-guest-frame/src/dom';
	
	
	var _react = __webpack_require__(8);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(9);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactUiComponents = __webpack_require__(10);
	
	var _reactRedux = __webpack_require__(11);
	
	var _neosUiReduxStore = __webpack_require__(12);
	
	var _plowJs = __webpack_require__(13);
	
	var _neosUiDecorators = __webpack_require__(14);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var getGuestFrameWindow = function getGuestFrameWindow() {
		return document.getElementsByName('neos-content-main')[0].contentWindow;
	};
	
	var BlockStyles = (_dec = (0, _reactRedux.connect)((0, _plowJs.$transform)({
		formattingUnderCursor: _neosUiReduxStore.selectors.UI.ContentCanvas.formattingUnderCursor,
		focusedNodeType: _neosUiReduxStore.selectors.CR.Nodes.focusedNodeTypeSelector,
		currentlyEditedPropertyName: _neosUiReduxStore.selectors.UI.ContentCanvas.currentlyEditedPropertyName
	
	})), _dec2 = (0, _neosUiDecorators.neos)(function (globalRegistry) {
		return {
			frontendConfiguration: globalRegistry.get('frontendConfiguration'),
			nodeTypesRegistry: globalRegistry.get('@neos-project/neos-ui-contentrepository')
		};
	}), _dec(_class = _dec2(_class = function (_PureComponent) {
		_inherits(BlockStyles, _PureComponent);
	
		function BlockStyles() {
			var _ref;
	
			var _temp, _this, _ret;
	
			_classCallCheck(this, BlockStyles);
	
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = BlockStyles.__proto__ || Object.getPrototypeOf(BlockStyles)).call.apply(_ref, [this].concat(args))), _this), _this.renderStyleDefinition = function (_ref2, blockStylePresetName) {
				var _ref3 = _slicedToArray(_ref2, 2),
				    styleDefinitionId = _ref3[0],
				    styleDefinition = _ref3[1];
	
				var classesList = (0, _plowJs.$get)(['Sandstorm.BlockStyles', 'classes'], _this.props.formattingUnderCursor);
	
				var classesForOption = Object.keys(styleDefinition.options);
				var enabledClass = classesList && classesList.find(function (it) {
					return classesForOption.indexOf(it) !== -1;
				});
				var options = Object.entries(styleDefinition.options).map(function (_ref4) {
					var _ref5 = _slicedToArray(_ref4, 2),
					    key = _ref5[0],
					    option = _ref5[1];
	
					return _extends({
						value: key
					}, option);
				});
	
				return _react2.default.createElement(_reactUiComponents.SelectBox, { key: styleDefinitionId, options: options, value: enabledClass, onValueChange: _this.handleValueChange(styleDefinitionId, blockStylePresetName) });
			}, _this.handleValueChange = function (styleDefinitionId, blockStylePresetName) {
				return function (value) {
					getGuestFrameWindow().NeosCKEditorApi.toggleFormat("Sandstorm.BlockStyles", { blockStylePresetName: blockStylePresetName, styleDefinitionId: styleDefinitionId, value: value });
				};
			}, _temp), _possibleConstructorReturn(_this, _ret);
		}
	
		_createClass(BlockStyles, [{
			key: 'render',
			value: function render() {
				var _this2 = this;
	
				var _props = this.props,
				    focusedNodeType = _props.focusedNodeType,
				    currentlyEditedPropertyName = _props.currentlyEditedPropertyName,
				    frontendConfiguration = _props.frontendConfiguration,
				    nodeTypesRegistry = _props.nodeTypesRegistry;
	
				var inlineEditorOptions = nodeTypesRegistry.getInlineEditorOptionsForProperty(focusedNodeType, currentlyEditedPropertyName);
	
				var blockStylePresetName = (0, _plowJs.$get)(['formatting', 'Sandstorm.BlockStyles'], inlineEditorOptions);
	
				var stylePresets = frontendConfiguration.get('Sandstorm.BlockStyles:presets');
	
				var blockStylePreset = stylePresets[blockStylePresetName];
				if (!blockStylePreset) {
					return null;
				}
	
				return _react2.default.createElement(
					'div',
					null,
					Object.entries(blockStylePreset).map(function (it) {
						return _this2.renderStyleDefinition(it, blockStylePresetName);
					})
				);
			}
		}]);
	
		return BlockStyles;
	}(_react.PureComponent)) || _class) || _class);
	exports.default = BlockStyles;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _readFromConsumerApi = __webpack_require__(6);
	
	var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _readFromConsumerApi2.default)('vendor')().React;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _readFromConsumerApi = __webpack_require__(6);
	
	var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _readFromConsumerApi2.default)('vendor')().PropTypes;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _readFromConsumerApi = __webpack_require__(6);
	
	var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().ReactUiComponents;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _readFromConsumerApi = __webpack_require__(6);
	
	var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _readFromConsumerApi2.default)('vendor')().reactRedux;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _readFromConsumerApi = __webpack_require__(6);
	
	var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiReduxStore;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _readFromConsumerApi = __webpack_require__(6);
	
	var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _readFromConsumerApi2.default)('vendor')().plow;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _readFromConsumerApi = __webpack_require__(6);
	
	var _readFromConsumerApi2 = _interopRequireDefault(_readFromConsumerApi);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	module.exports = (0, _readFromConsumerApi2.default)('NeosProjectPackages')().NeosUiDecorators;

/***/ }),
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	exports.findAllAppliedClassesExceptForOneStyleDefinition = findAllAppliedClassesExceptForOneStyleDefinition;
	function findAllAppliedClassesExceptForOneStyleDefinition(styleDefinitionId, blockStylePreset, editor, CKEDITOR) {
	    var elementPath = editor.elementPath();
	
	    var classNames = Object.entries(blockStylePreset).map(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2),
	            key = _ref2[0],
	            value = _ref2[1];
	
	        if (key === styleDefinitionId) {
	            return null;
	        }
	
	        return Object.keys(value.options).find(function (className) {
	            return elementPath.block.hasClass(className);
	        });
	    }).filter(Boolean);
	
	    return classNames;
	}

/***/ })
/******/ ]);
//# sourceMappingURL=Plugin.js.map