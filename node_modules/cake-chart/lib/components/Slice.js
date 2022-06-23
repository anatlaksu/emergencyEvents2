// http://codepen.io/maydie/details/OVmxZZ

'use strict';

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsGetAnglePoint = require('../utils/getAnglePoint');

var _utilsGetAnglePoint2 = _interopRequireDefault(_utilsGetAnglePoint);

var Slice = (function (_Component) {
  _inherits(Slice, _Component);

  function Slice() {
    var _this = this;

    _classCallCheck(this, Slice);

    _get(Object.getPrototypeOf(Slice.prototype), 'constructor', this).apply(this, arguments);

    this.handleClick = function () {
      _this.props.onClick && _this.props.onClick(_this.props.node);
    };
  }

  _createClass(Slice, [{
    key: 'drawPath',
    value: function drawPath() {
      var _props = this.props;
      var angleRange = _props.angleRange;
      var sliceRadiusRange = _props.sliceRadiusRange;

      var angle = angleRange.end - angleRange.start;
      var startRadius = sliceRadiusRange.start;
      var endRadius = sliceRadiusRange.end;

      // Get angle points
      var a = (0, _utilsGetAnglePoint2['default'])(angleRange.start, angleRange.end, endRadius, 0, 0);
      var b = (0, _utilsGetAnglePoint2['default'])(angleRange.start, angleRange.end, startRadius, 0, 0);

      return ['M' + a.x1 + ',' + a.y1, 'A' + endRadius + ',' + endRadius + ' 0 ' + (angle > 180 ? 1 : 0) + ',1 ' + a.x2 + ',' + a.y2, angle < 360 ? 'L' + b.x2 + ',' + b.y2 : 'M' + b.x2 + ',' + b.y2, startRadius > 0 ? 'A' + startRadius + ',' + startRadius + ' 0 ' + (angle > 180 ? 1 : 0) + ',0 ' + b.x1 + ',' + b.y1 : '', 'Z'].join(' ');
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var fill = _props2.fill;
      var stroke = _props2.stroke;
      var strokeWidth = _props2.strokeWidth;
      var className = _props2.className;

      return _react2['default'].createElement('path', _extends({ d: this.drawPath(),
        onClick: this.handleClick
      }, { fill: fill, stroke: stroke, strokeWidth: strokeWidth, className: className }));
    }
  }], [{
    key: 'propTypes',
    value: {
      angleRange: _react.PropTypes.shape({
        start: _react.PropTypes.number.isRequired,
        end: _react.PropTypes.number.isRequired
      }),
      sliceRadiusRange: _react.PropTypes.shape({
        start: _react.PropTypes.number.isRequired,
        end: _react.PropTypes.number.isRequired
      }),
      stroke: _react.PropTypes.string,
      fill: _react.PropTypes.string,
      strokeWidth: _react.PropTypes.number,
      className: _react.PropTypes.string,
      onClick: _react.PropTypes.func,
      node: _react.PropTypes.any
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      strokeWidth: 3
    },
    enumerable: true
  }]);

  return Slice;
})(_react.Component);

exports['default'] = Slice;
module.exports = exports['default'];