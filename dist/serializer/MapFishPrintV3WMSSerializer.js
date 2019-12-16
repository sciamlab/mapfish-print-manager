"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MapFishPrintV3WMSSerializer = void 0;

var _ImageWMS = _interopRequireDefault(require("ol/source/ImageWMS"));

var _defaultsDeep = _interopRequireDefault(require("lodash/defaultsDeep"));

var _BaseSerializer2 = _interopRequireDefault(require("./BaseSerializer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The MapFishPrintV3WMSSerializer.
 *
 * @class
 */
var MapFishPrintV3WMSSerializer =
/*#__PURE__*/
function (_BaseSerializer) {
  _inherits(MapFishPrintV3WMSSerializer, _BaseSerializer);

  /**
   * The WMS layer type identificator.
   *
   * @type {string}
   */

  /**
   * The ol sources this serializer is capable of serializing.
   *
   * @type {Array}
   */

  /**
   * The constructor
   */
  function MapFishPrintV3WMSSerializer() {
    _classCallCheck(this, MapFishPrintV3WMSSerializer);

    return _possibleConstructorReturn(this, _getPrototypeOf(MapFishPrintV3WMSSerializer).call(this, arguments));
  }
  /**
   * Serializes/Encodes the given layer.
   *
   * @param {ol.layer.Layer} layer The layer to serialize/encode.
   * @param {Object} opts Additional properties to pass to the serialized
   *   layer object that can't be obtained by the layer itself. It can also be
   *   used to override all generated layer values, e.g. the image format.
   * @return {Object} The serialized/encoded layer.
   */


  _createClass(MapFishPrintV3WMSSerializer, [{
    key: "serialize",
    value: function serialize(layer) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      (0, _defaultsDeep["default"])(opts, {
        failOnError: false,
        mergeableParams: [],
        method: 'GET',
        rasterStyle: undefined,
        // One of MAPSERVER, GEOSERVER, QGISSERVER
        serverType: undefined,
        useNativeAngle: false
      });
      var source = layer.getSource();

      if (!this.validateSource(source)) {
        return;
      }

      var layers = source.getParams().LAYERS;
      var layersArray = layers ? layers.split(',') : [''];
      var styles = source.getParams().STYLES;
      var stylesArray = styles ? styles.split(',') : [''];

      var _source$getParams = source.getParams(),
          LAYERS = _source$getParams.LAYERS,
          STYLES = _source$getParams.STYLES,
          VERSION = _source$getParams.VERSION,
          WIDTH = _source$getParams.WIDTH,
          HEIGHT = _source$getParams.HEIGHT,
          FORMAT = _source$getParams.FORMAT,
          BBOX = _source$getParams.BBOX,
          CRS = _source$getParams.CRS,
          SRS = _source$getParams.SRS,
          customParams = _objectWithoutProperties(_source$getParams, ["LAYERS", "STYLES", "VERSION", "WIDTH", "HEIGHT", "FORMAT", "BBOX", "CRS", "SRS"]);

      var serialized = _objectSpread({}, _get(_getPrototypeOf(MapFishPrintV3WMSSerializer.prototype), "serialize", this).call(this, layer, opts), {}, {
        baseURL: source instanceof _ImageWMS["default"] ? source.getUrl() : source.getUrls()[0],
        customParams: customParams,
        imageFormat: source.getParams().FORMAT || 'image/png',
        layers: layersArray,
        name: layer.get('name'),
        opacity: layer.getOpacity(),
        styles: stylesArray,
        version: source.getParams().VERSION || '1.1.0',
        type: this.constructor.TYPE_WMS
      }, {}, opts);

      return serialized;
    }
  }]);

  return MapFishPrintV3WMSSerializer;
}(_BaseSerializer2["default"]);

exports.MapFishPrintV3WMSSerializer = MapFishPrintV3WMSSerializer;

_defineProperty(MapFishPrintV3WMSSerializer, "TYPE_WMS", 'wms');

_defineProperty(MapFishPrintV3WMSSerializer, "sourceCls", [_ImageWMS["default"]]);

var _default = MapFishPrintV3WMSSerializer;
exports["default"] = _default;