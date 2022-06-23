"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getSliceRadiusRange;
function radiusFactor(level, factor) {
  return Array.apply(null, { length: level }).reduce(function (sum, v, k) {
    return sum + Math.pow(factor, k);
  }, 0);
}

function getSliceRadiusRange(coreRadius, ringWidth, level, factor) {
  return {
    start: level ? coreRadius + ringWidth * radiusFactor(level - 1, factor) : 0,
    end: coreRadius + ringWidth * radiusFactor(level, factor)
  };
}

module.exports = exports["default"];