'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPureRenderFunction = require('react-pure-render/function');

var _reactPureRenderFunction2 = _interopRequireDefault(_reactPureRenderFunction);

var _Slice = require('./Slice');

var _Slice2 = _interopRequireDefault(_Slice);

var _utilsGetDefaultColor = require('../utils/getDefaultColor');

var _utilsGetDefaultColor2 = _interopRequireDefault(_utilsGetDefaultColor);

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Ring = (function (_Component) {
  _inherits(Ring, _Component);

  function Ring() {
    _classCallCheck(this, _Ring);

    _get(Object.getPrototypeOf(_Ring.prototype), 'constructor', this).apply(this, arguments);

    this.shouldComponentUpdate = _reactPureRenderFunction2['default'];
  }

  _createClass(Ring, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var slices = _props.slices;
      var level = _props.level;
      var sliceRadiusRange = _props.sliceRadiusRange;
      var center = _props.center;
      var stroke = _props.stroke;
      var strokeWidth = _props.strokeWidth;
      var onClick = _props.onClick;
      var className = _props.className;
      var getSliceProps = _props.getSliceProps;
      var classes = _props.sheet.classes;

      var rectSize = sliceRadiusRange.end + 20;
      var hasChildren = function hasChildren(s) {
        return s.node.children && s.node.children.length > 0;
      };

      return _react2['default'].createElement(
        'g',
        { className: className },
        _react2['default'].createElement('rect', { x: center - rectSize, y: center - rectSize,
          width: rectSize * 2, height: rectSize * 2,
          fill: 'transparent', className: classes.backgroundRect }),
        slices.map(function (slice, idx) {
          var _classNames;

          return _react2['default'].createElement(_Slice2['default'], getSliceProps(slice, idx, {
            key: idx,
            node: slice.node,
            angleRange: { start: slice.start, end: slice.end },
            percentValue: slice.percentValue.toFixed(1),
            fill: (0, _utilsGetDefaultColor2['default'])(level, idx),
            className: (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, classes.sliceActive, hasChildren(slice)), _defineProperty(_classNames, classes.slice, true), _classNames)),
            stroke: stroke, strokeWidth: strokeWidth, sliceRadiusRange: sliceRadiusRange, onClick: onClick, level: level
          }));
        })
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      stroke: _Slice2['default'].propTypes.stroke,
      strokeWidth: _Slice2['default'].propTypes.strokeWidth,
      sliceRadiusRange: _Slice2['default'].propTypes.sliceRadiusRange,
      onClick: _Slice2['default'].propTypes.onClick,

      level: _react.PropTypes.number.isRequired,
      center: _react.PropTypes.number.isRequired,
      className: _react.PropTypes.string.isRequired,
      getSliceProps: _react.PropTypes.func.isRequired,
      slices: _react.PropTypes.array.isRequired
    },
    enumerable: true
  }]);

  var _Ring = Ring;
  Ring = (0, _reactJss2['default'])({
    slice: {},

    sliceActive: {
      cursor: 'pointer'
    },

    backgroundRect: {
      visibility: 'none',
      'pointer-events': 'none'
    }
  })(Ring) || Ring;
  return Ring;
})(_react.Component);

exports['default'] = Ring;
module.exports = exports['default'];