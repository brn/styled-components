'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _validAttr = require('../utils/validAttr');

var _validAttr2 = _interopRequireDefault(_validAttr);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var babelPluginFlowReactPropTypes_proptype_Target = require('../types').babelPluginFlowReactPropTypes_proptype_Target || require('prop-types').any;

var babelPluginFlowReactPropTypes_proptype_Interpolation = require('../types').babelPluginFlowReactPropTypes_proptype_Interpolation || require('prop-types').any;

exports.default = function (css) {
  var constructWithOptions = function constructWithOptions(componentConstructor, tag) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (process.env.NODE_ENV !== 'production' && typeof tag !== 'string' && typeof tag !== 'function' && (typeof tag === 'undefined' ? 'undefined' : _typeof(tag)) !== 'object') {
      // $FlowInvalidInputTest
      throw new Error('Cannot create styled-component for component: ' + tag);
    }

    /* This is callable directly as a template function */
    var templateFunction = function templateFunction(strings) {
      for (var _len = arguments.length, interpolations = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        interpolations[_key - 1] = arguments[_key];
      }

      var C = componentConstructor(tag, options, css.apply(undefined, [strings].concat(interpolations)));
      return _react2.default.forwardRef(function (p, ref) {
        var propsForElement = Object.keys(p).reduce(function (acc, propName) {
          if (propName !== 'children') {
            if (typeof tag === 'string') {
              if ((0, _validAttr2.default)(propName)) {
                acc[propName] = p[propName];
              }
            } else {
              // Don't pass through non HTML tags through to HTML elements
              // always omit innerRef
              // eslint-disable-next-line no-param-reassign
              acc[propName] = p[propName];
            }
          }

          return acc;
        }, {});
        propsForElement.innerRef = ref;
        return _react2.default.createElement(C, propsForElement, p.children);
      });
    };

    /* If config methods are called, wrap up a new template function and merge options */
    templateFunction.withConfig = function (config) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, config));
    };
    templateFunction.attrs = function (attrs) {
      return constructWithOptions(componentConstructor, tag, _extends({}, options, {
        attrs: _extends({}, options.attrs || {}, attrs)
      }));
    };

    return templateFunction;
  };

  return constructWithOptions;
};

module.exports = exports['default'];