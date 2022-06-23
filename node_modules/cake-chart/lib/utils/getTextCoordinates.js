'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getTextCoordinates;

var _getAnglePoint = require('./getAnglePoint');

var _getAnglePoint2 = _interopRequireDefault(_getAnglePoint);

var _getSliceRadiusRange = require('./getSliceRadiusRange');

var _getSliceRadiusRange2 = _interopRequireDefault(_getSliceRadiusRange);

function getTextCoordinates(slice, coreRadius, ringWidth, center, factor) {
  var sliceRadiusRange = (0, _getSliceRadiusRange2['default'])(coreRadius, ringWidth, slice.level, factor);
  var c = (0, _getAnglePoint2['default'])((slice.start + slice.end) / 2, 0, coreRadius && (sliceRadiusRange.start + sliceRadiusRange.end) / 2, center, center);

  if (!slice.level) {
    return { x: 50, y: 50 };
  }

  return {
    x: c.x1 / (center * 2) * 100,
    y: c.y1 / (center * 2) * 100
  };
}

module.exports = exports['default'];