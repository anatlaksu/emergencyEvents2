"use strict";

var _toConsumableArray = require("babel-runtime/helpers/to-consumable-array")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createSliceTree;
function reduceAngleTree(angleTree, node, sum, level, limit) {
  var angle = node.value / sum * 360;
  var percentValue = node.value / sum * 100;

  return {
    angle: angleTree.angle + angle,
    tree: [].concat(_toConsumableArray(angleTree.tree), [{
      node: node,
      start: angleTree.angle,
      end: angleTree.angle + angle,
      level: level,
      value: node.value,
      percentValue: percentValue
    }], _toConsumableArray(level < limit && node.children ? node.children.reduce(function (at, s) {
      return reduceAngleTree(at, s, sum, level + 1, limit);
    }, { angle: angleTree.angle, tree: [] }).tree : []))
  };
}

function createSliceTree(rootNode, limit) {
  var sum = rootNode.value;

  var tree = rootNode.children.reduce(function (angleTree, node) {
    return reduceAngleTree(angleTree, node, sum, 1, limit);
  }, { angle: 0, tree: [] }).tree;

  return [].concat(_toConsumableArray(tree.reduce(function (t, slice) {
    t[slice.level - 1] = [].concat(_toConsumableArray(t[slice.level - 1] || []), [slice]);
    return t;
  }, []).map(function (slices, idx) {
    return { level: idx + 1, slices: slices };
  }).sort(function (a, b) {
    return b.level - a.level;
  })), [{
    level: 0,
    slices: [{
      node: rootNode,
      start: 0,
      end: 360,
      value: sum,
      percentValue: 100,
      level: 0
    }]
  }]);
}

module.exports = exports["default"];