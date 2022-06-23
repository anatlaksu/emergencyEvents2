"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getAnglePoint;

function getAnglePoint(startAngle, endAngle, radius, x, y) {
  var x1, y1, x2, y2;

  x1 = x + radius * Math.cos(Math.PI * startAngle / 180);
  y1 = y + radius * Math.sin(Math.PI * startAngle / 180);
  x2 = x + radius * Math.cos(Math.PI * endAngle / 180);
  y2 = y + radius * Math.sin(Math.PI * endAngle / 180);

  return { x1: x1, y1: y1, x2: x2, y2: y2 };
}

module.exports = exports["default"];