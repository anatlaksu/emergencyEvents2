'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = getDefaultColor;

function getDefaultColor(level, idx) {
  var colors = ['#43A19E', '#7B43A1', '#F2317A', '#FF9824', '#58CF6C'];

  return colors[(level + idx) % 5];
}

module.exports = exports['default'];