// http://codepen.io/maydie/details/OVmxZZ

'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _defineProperty = require('babel-runtime/helpers/define-property')['default'];

var _get = require('babel-runtime/helpers/get')['default'];

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _slicedToArray = require('babel-runtime/helpers/sliced-to-array')['default'];

var _getIterator = require('babel-runtime/core-js/get-iterator')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsGetTextCoordinates = require('../utils/getTextCoordinates');

var _utilsGetTextCoordinates2 = _interopRequireDefault(_utilsGetTextCoordinates);

var _utilsCreateSliceTree = require('../utils/createSliceTree');

var _utilsCreateSliceTree2 = _interopRequireDefault(_utilsCreateSliceTree);

var _Ring = require('./Ring');

var _Ring2 = _interopRequireDefault(_Ring);

var _jss = require('jss');

var _jss2 = _interopRequireDefault(_jss);

var _jssVendorPrefixer = require('jss-vendor-prefixer');

var _jssVendorPrefixer2 = _interopRequireDefault(_jssVendorPrefixer);

var _reactLibReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var _reactLibReactCSSTransitionGroup2 = _interopRequireDefault(_reactLibReactCSSTransitionGroup);

var _utilsGetSliceRadiusRange = require('../utils/getSliceRadiusRange');

var _utilsGetSliceRadiusRange2 = _interopRequireDefault(_utilsGetSliceRadiusRange);

var _utilsGetDefaultColor = require('../utils/getDefaultColor');

var _utilsGetDefaultColor2 = _interopRequireDefault(_utilsGetDefaultColor);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsDefaultSheets = require('../utils/defaultSheets');

var _reactJss = require('react-jss');

var _reactJss2 = _interopRequireDefault(_reactJss);

var _lodashThrottle = require('lodash.throttle');

var _lodashThrottle2 = _interopRequireDefault(_lodashThrottle);

_jss2['default'].use(_jssVendorPrefixer2['default']);

var ringSheet = null;
var ringTransitionSheet = null;

function detachRingSheets() {
  if (ringSheet) {
    ringSheet.detach();
  }

  if (ringTransitionSheet) {
    ringTransitionSheet.detach();
  }
}

function attachRingSheets(props) {
  detachRingSheets();
  var classes = props.sheet.classes;
  var _props$transitionName = props.transitionName;
  var transitionName = _props$transitionName === undefined ? classes.pieChart : _props$transitionName;
  var _props$labelTransitionName = props.labelTransitionName;
  var labelTransitionName = _props$labelTransitionName === undefined ? classes.labelsBox : _props$labelTransitionName;
  var _props$className = props.className;
  var className = _props$className === undefined ? classes.wrapper : _props$className;

  var _createDefaultSheets = (0, _utilsDefaultSheets.createDefaultSheets)(_extends({}, props, {
    transitionName: transitionName, labelTransitionName: labelTransitionName, className: className
  }));

  var _createDefaultSheets2 = _slicedToArray(_createDefaultSheets, 2);

  ringSheet = _createDefaultSheets2[0];
  ringTransitionSheet = _createDefaultSheets2[1];

  ringSheet.attach();
  ringTransitionSheet.attach();
}

function getDefaultLabel(slice) {
  return slice.end - slice.start > 15 && (slice.node.label || slice.node.value);
}

function getDefaultLabelProps(slice, idx, center, props, classes) {
  var _classNames;

  var coreRadius = props.coreRadius;
  var ringWidth = props.ringWidth;
  var ringWidthFactor = props.ringWidthFactor;

  var pos = (0, _utilsGetTextCoordinates2['default'])(slice, coreRadius, ringWidth, center, ringWidthFactor);
  var hasChildren = slice.node.children && slice.node.children.length;
  var className = (0, _classnames2['default'])((_classNames = {}, _defineProperty(_classNames, classes.label, true), _defineProperty(_classNames, classes.labelActive, hasChildren), _classNames));
  var label = getDefaultLabel(slice);

  return {
    className: className,
    style: {
      left: pos.x + '%',
      top: pos.y + '%',
      background: (0, _utilsGetDefaultColor2['default'])(slice.level, idx),
      display: label ? 'block' : 'none'
    },
    key: slice.level + '-' + idx,
    onClick: props.onClick.bind(null, slice.node)
  };
}

function getDefaultKey(node) {
  return node.key || node.label + '-' + node.value;
}

var CakeChart = (function (_Component) {
  _inherits(CakeChart, _Component);

  function CakeChart() {
    var _this = this;

    _classCallCheck(this, _CakeChart);

    _get(Object.getPrototypeOf(_CakeChart.prototype), 'constructor', this).apply(this, arguments);

    this.handleWindowResize = function () {
      window.requestAnimationFrame(_this.updateLabelsSize);
    };

    this.debouncedWindowResize = (0, _lodashThrottle2['default'])(this.handleWindowResize, 50);

    this.updateLabelsSize = function () {
      var labelsEl = _react2['default'].findDOMNode(_this.refs.labels);
      var containerEl = _react2['default'].findDOMNode(_this.refs.container);
      var size = Math.min(containerEl.offsetHeight, containerEl.offsetWidth);
      labelsEl.style.height = size + 'px';
      labelsEl.style.width = size + 'px';
    };
  }

  _createClass(CakeChart, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      attachRingSheets(this.props);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this.debouncedWindowResize);
      this.updateLabelsSize();
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps) {
      if (nextProps.limit !== this.props.limit) {
        attachRingSheets(nextProps);
      }
      this.updateLabelsSize();
    }
  }, {
    key: 'componentWillUnount',
    value: function componentWillUnount() {
      detachRingSheets();
      window.removeEventListener('resize', this.debouncedWindowResize);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classes = this.props.sheet.classes;
      var _props = this.props;
      var coreRadius = _props.coreRadius;
      var ringWidth = _props.ringWidth;
      var onClick = _props.onClick;
      var getRingProps = _props.getRingProps;
      var getSliceProps = _props.getSliceProps;
      var style = _props.style;
      var data = _props.data;
      var getKey = _props.getKey;
      var stroke = _props.stroke;
      var strokeWidth = _props.strokeWidth;
      var limit = _props.limit;
      var ringWidthFactor = _props.ringWidthFactor;
      var _props$transitionName2 = _props.transitionName;
      var transitionName = _props$transitionName2 === undefined ? classes.pieChart : _props$transitionName2;
      var _props$labelTransitionName2 = _props.labelTransitionName;
      var labelTransitionName = _props$labelTransitionName2 === undefined ? classes.labelsBox : _props$labelTransitionName2;
      var _props$className2 = _props.className;
      var className = _props$className2 === undefined ? classes.wrapper : _props$className2;

      var center = (0, _utilsGetSliceRadiusRange2['default'])(coreRadius, ringWidth, limit, ringWidthFactor).end;
      var diameter = center * 2;
      var sliceTree = (0, _utilsCreateSliceTree2['default'])(data, limit);
      var centerRule = _jss2['default'].createRule({
        transform: 'translate(' + center + 'px, ' + center + 'px)'
      });
      var key = getKey(data, getDefaultKey(data));

      return _react2['default'].createElement(
        'div',
        { className: className,
          style: style,
          ref: 'container' },
        _react2['default'].createElement(
          'div',
          { className: classes.labels },
          _react2['default'].createElement(
            _reactLibReactCSSTransitionGroup2['default'],
            { component: 'div',
              className: classes.labelsTransition,
              transitionName: labelTransitionName,
              transitionAppear: true,
              ref: 'labels' },
            sliceTree.map(function (block, idx) {
              return _this2.renderTexts(block, center, idx + '-' + key);
            })
          )
        ),
        _react2['default'].createElement(
          'svg',
          { width: '100%',
            height: '100%',
            viewBox: '0 0 ' + diameter + ' ' + diameter,
            xmlns: 'http://www.w3.org/2000/svg',
            version: '1.1',
            className: classes.svg },
          _react2['default'].createElement(
            'g',
            { style: centerRule.style },
            _react2['default'].createElement(
              _reactLibReactCSSTransitionGroup2['default'],
              { component: 'g',
                transitionName: transitionName,
                transitionAppear: true },
              sliceTree.map(function (block, idx) {
                return _react2['default'].createElement(_Ring2['default'], getRingProps(block, {
                  key: idx + '-' + key,
                  className: ringSheet.classes['ring-' + block.level],
                  slices: block.slices,
                  level: block.level,
                  sliceRadiusRange: (0, _utilsGetSliceRadiusRange2['default'])(coreRadius, ringWidth, block.level, ringWidthFactor),
                  center: center, getSliceProps: getSliceProps,
                  stroke: stroke, strokeWidth: strokeWidth, onClick: onClick
                }));
              })
            )
          )
        )
      );
    }
  }, {
    key: 'renderTexts',
    value: function renderTexts(block, center, key) {
      var _this3 = this;

      var _props2 = this.props;
      var getLabelProps = _props2.getLabelProps;
      var getLabel = _props2.getLabel;
      var classes = _props2.sheet.classes;

      return _react2['default'].createElement(
        'div',
        { key: key,
          className: ringSheet.classes['labels-' + block.level] },
        (function () {
          var _ref = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _getIterator(block.slices), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var slice = _step.value;

              _ref.push(_react2['default'].createElement(
                'div',
                getLabelProps(slice, block.slices.indexOf(slice), getDefaultLabelProps(slice, block.slices.indexOf(slice), center, _this3.props, classes)),
                getLabel(slice, getDefaultLabel(slice))
              ));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return _ref;
        })()
      );
    }
  }], [{
    key: 'propTypes',
    value: {
      stroke: _react.PropTypes.string,
      strokeWidth: _react.PropTypes.number,
      onClick: _react.PropTypes.func,

      data: _react.PropTypes.shape({
        value: _react.PropTypes.number.isRequired,
        label: _react.PropTypes.any,
        color: _react.PropTypes.string,
        children: _react.PropTypes.array
      }).isRequired,

      coreRadius: _react.PropTypes.number,
      ringWidth: _react.PropTypes.number,
      ringWidthFactor: _react.PropTypes.number,
      limit: _react.PropTypes.number,
      transitionName: _react.PropTypes.string,
      labelTransitionName: _react.PropTypes.string,
      className: _react.PropTypes.string,
      getLabelComponent: _react.PropTypes.func
    },
    enumerable: true
  }, {
    key: 'defaultProps',
    value: {
      limit: 5,
      strokeWidth: 3,
      stroke: '#FFFFFF',
      ringWidthFactor: 0.7,
      getRingProps: function getRingProps(block, props) {
        return props;
      },
      getSliceProps: function getSliceProps(slice, idx, props) {
        return props;
      },
      getLabelProps: function getLabelProps(slice, idx, props) {
        return props;
      },
      getLabel: function getLabel(slice, label) {
        return label;
      },
      getKey: function getKey(node, key) {
        return key;
      }
    },
    enumerable: true
  }]);

  var _CakeChart = CakeChart;
  CakeChart = (0, _reactJss2['default'])(_utilsDefaultSheets.sheet, { link: true })(CakeChart) || CakeChart;
  return CakeChart;
})(_react.Component);

exports['default'] = CakeChart;
module.exports = exports['default'];