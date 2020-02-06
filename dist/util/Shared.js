"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Shared = void 0;

var _Group = _interopRequireDefault(require("ol/layer/Group"));

var _TileWMS = _interopRequireDefault(require("ol/source/TileWMS"));

var _ImageWMS = _interopRequireDefault(require("ol/source/ImageWMS"));

var _Units = require("ol/proj/Units");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Some shared static utility methods.
 *
 * @class
 */
var Shared = function Shared() {
  _classCallCheck(this, Shared);
};

exports.Shared = Shared;

_defineProperty(Shared, "getInteractionsByName", function (map, name) {
  var interactions = map.getInteractions().getArray();
  return interactions.filter(function (interaction) {
    return interaction.get('name') === name;
  });
});

_defineProperty(Shared, "removeInteractionsByName", function (map, name) {
  var interactions = map.getInteractions().getArray();
  return interactions.filter(function (interaction) {
    return interaction.get('name') === name;
  }).map(function (interaction) {
    return map.removeInteraction(interaction);
  });
});

_defineProperty(Shared, "getLayersByName", function (map, name) {
  var layers = Shared.getMapLayers(map);
  return layers.filter(function (layer) {
    return layer.get('name') === name;
  });
});

_defineProperty(Shared, "getMapLayers", function (collection) {
  var layers = collection.getLayers().getArray();
  var mapLayers = [];
  layers.forEach(function (layer) {
    if (layer instanceof _Group["default"]) {
      Shared.getMapLayers(layer).forEach(function (l) {
        if (layer.getVisible()) mapLayers.push(l);
      });
    } else {
      mapLayers.push(layer);
    }
  });
  return mapLayers;
});

_defineProperty(Shared, "getLegendGraphicUrl", function (layer) {
  if (layer.getSource() instanceof _TileWMS["default"] || layer.getSource() instanceof _ImageWMS["default"]) {
    var customParams = layer.get('customPrintLegendParams');
    var source = layer.getSource();

    var _source$getParams = source.getParams(),
        LAYERS = _source$getParams.LAYERS,
        VERSION = _source$getParams.VERSION,
        FORMAT = _source$getParams.FORMAT,
        passThroughParams = _objectWithoutProperties(_source$getParams, ["LAYERS", "VERSION", "FORMAT"]);

    var url = source instanceof _ImageWMS["default"] ? source.getUrl() : source.getUrls()[0];

    var params = _objectSpread({
      LAYER: LAYERS.split(',')[0],
      VERSION: VERSION || '1.3.0',
      SERVICE: 'WMS',
      REQUEST: 'GetLegendGraphic',
      FORMAT: FORMAT || 'image/png'
    }, customParams, {}, passThroughParams);

    var queryParams = Object.keys(params).map(function (key) {
      return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(params[key]));
    }).join('&');
    return "".concat(url, "?").concat(queryParams);
  }
});

_defineProperty(Shared, "getScaleForResolution", function (resolution, units) {
  var dpi = 25.4 / 0.28;
  var mpu = _Units.METERS_PER_UNIT[units];
  var inchesPerMeter = 39.37;
  return parseFloat(resolution) * mpu * inchesPerMeter * dpi;
});

var _default = Shared;
exports["default"] = _default;