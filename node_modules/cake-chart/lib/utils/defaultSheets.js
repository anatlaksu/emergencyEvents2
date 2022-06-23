'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.createDefaultSheets = createDefaultSheets;

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var sheet = {
  wrapper: {
    position: 'relative'
  },

  svg: {
    width: '100%',
    height: '100%'
  },

  pieChart: {
    'animation-fill-mode': 'both'
  },

  activeSlice: {
    cursor: 'pointer'
  },

  labels: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    'pointer-events': 'none',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  },

  labelsBox: {},
  label: {
    border: '2px solid #FFFFFF',
    position: 'absolute',
    'pointer-events': 'all',
    color: '#FFF',
    'z-index': 1,
    'white-space': 'nowrap',
    transform: 'translate(-50%, -50%)',
    padding: '2px 8px',
    'border-radius': '100px',
    'box-shadow': '0 2px 4px rgba(66, 66, 66, 0.3)'
  },

  labelActive: {
    cursor: 'pointer'
  },

  labelsTransition: {
    position: 'relative'
  }
};

exports.sheet = sheet;

function createDefaultSheets(props) {
  var depth = props.limit;

  var ringSheet = _jss2['default'].createStyleSheet(_extends({}, Array.apply(null, Array(depth + 1)).map(function (v, k) {
    return k;
  }).reduce(function (rules, idx) {
    var _extends2;

    return _extends({}, rules, (_extends2 = {}, _defineProperty(_extends2, 'ring-' + idx, {}), _defineProperty(_extends2, 'labels-' + idx, {}), _extends2));
  }, {})));

  var rings = ringSheet.classes;

  var trName = props.transitionName;
  var labelTrName = props.labelTransitionName;

  var ringTransitionSheet = _jss2['default'].createStyleSheet(_extends({}, Array.apply(null, Array(depth + 1)).map(function (v, k) {
    return k;
  }).reduce(function (rules, idx) {
    var _extends3;

    return _extends({}, rules, (_extends3 = {}, _defineProperty(_extends3, '.' + trName + '-appear.' + rings['ring-' + idx], {
      transform: 'scale(0.5)'
    }), _defineProperty(_extends3, '.' + trName + '-appear.' + trName + '-appear-active.' + rings['ring-' + idx], {
      transform: 'scale(1)',
      transition: 'transform 0.5s ease-out ' + idx / 5 + 's'
    }), _defineProperty(_extends3, '.' + trName + '-enter.' + rings['ring-' + idx], {
      transform: 'scale(0.5)'
    }), _defineProperty(_extends3, '.' + trName + '-enter.' + trName + '-enter-active.' + rings['ring-' + idx], {
      transform: 'scale(1)',
      transition: 'transform 0.5s ease-out ' + idx / 5 + 's'
    }), _defineProperty(_extends3, '.' + trName + '-leave.' + rings['ring-' + idx], {
      transform: 'scale(1)'
    }), _defineProperty(_extends3, '.' + trName + '-leave.' + trName + '-leave-active.' + rings['ring-' + idx], {
      transform: 'scale(0.5)',
      transition: 'transform 0.1s ease-in'
    }), _defineProperty(_extends3, '.' + labelTrName + '-appear.' + rings['labels-' + idx], {
      opacity: 0
    }), _defineProperty(_extends3, '.' + labelTrName + '-appear.' + labelTrName + '-appear-active.' + rings['labels-' + idx], {
      opacity: 1,
      transition: 'opacity 0.5s ease-out ' + (idx / 5 + 0.2) + 's'
    }), _defineProperty(_extends3, '.' + labelTrName + '-enter.' + rings['labels-' + idx], {
      opacity: 0
    }), _defineProperty(_extends3, '.' + labelTrName + '-enter.' + labelTrName + '-enter-active.' + rings['labels-' + idx], {
      opacity: 1,
      transition: 'opacity 0.5s ease-out ' + (idx / 5 + 0.2) + 's'
    }), _defineProperty(_extends3, '.' + labelTrName + '-leave.' + rings['labels-' + idx], {
      opacity: 1
    }), _defineProperty(_extends3, '.' + labelTrName + '-leave.' + labelTrName + '-leave-active.' + rings['labels-' + idx], {
      opacity: 0,
      transition: 'opacity 0.1s ease-in'
    }), _extends3));
  }, {})), { named: false });

  return [ringSheet, ringTransitionSheet];
}