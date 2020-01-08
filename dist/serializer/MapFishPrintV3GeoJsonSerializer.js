"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MapFishPrintV3GeoJsonSerializer = void 0;

var _Vector = _interopRequireDefault(require("ol/source/Vector"));

var _GeoJSON = _interopRequireDefault(require("ol/format/GeoJSON"));

var _Style = _interopRequireDefault(require("ol/style/Style"));

var _RegularShape = _interopRequireDefault(require("ol/style/RegularShape"));

var _Polygon = require("ol/geom/Polygon");

var _Feature = _interopRequireDefault(require("ol/Feature"));

var _Icon = _interopRequireDefault(require("ol/style/Icon"));

var _Circle = _interopRequireDefault(require("ol/style/Circle"));

var _Image = _interopRequireDefault(require("ol/style/Image"));

var _Text = _interopRequireDefault(require("ol/style/Text"));

var _Stroke = _interopRequireDefault(require("ol/style/Stroke"));

var _Fill = _interopRequireDefault(require("ol/style/Fill"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _pickBy = _interopRequireDefault(require("lodash/pickBy"));

var _parseColor = _interopRequireDefault(require("parse-color"));

var _parseCssFont = _interopRequireDefault(require("parse-css-font"));

var _defaultsDeep = _interopRequireDefault(require("lodash/defaultsDeep"));

var _BaseSerializer2 = _interopRequireDefault(require("./BaseSerializer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
 * The MapFishPrintV3GeoJsonSerializer.
 *
 * @class
 */
var MapFishPrintV3GeoJsonSerializer =
/*#__PURE__*/
function (_BaseSerializer) {
  _inherits(MapFishPrintV3GeoJsonSerializer, _BaseSerializer);

  /**
   * The vector GeoJSON type identificator.
   *
   * @type {string}
   */

  /**
   * The circle geometry type name.
   *
   * @type {string}
   */

  /**
   * The property to get the style dictionary key from.
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
  function MapFishPrintV3GeoJsonSerializer() {
    var _this;

    _classCallCheck(this, MapFishPrintV3GeoJsonSerializer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapFishPrintV3GeoJsonSerializer).call(this, arguments));

    _defineProperty(_assertThisInitialized(_this), "writeStyle", function (olStyle, geomType) {
      if (!(olStyle instanceof _Style["default"])) {
        return undefined;
      }

      var fillStyle = _this.writeFillStyle(olStyle.getFill());

      var imageStyle = _this.writeImageStyle(olStyle.getImage());

      var strokeStyle = _this.writeStrokeStyle(olStyle.getStroke());

      var textStyle = _this.writeTextStyle(olStyle.getText());

      var style = {};

      switch (geomType) {
        case 'Point':
        case 'MultiPoint':
          style = {
            version: 2,
            strokeColor: (0, _parseColor["default"])((0, _get2["default"])(imageStyle, 'stroke.color')).hex,
            strokeOpacity: (0, _get2["default"])((0, _parseColor["default"])((0, _get2["default"])(imageStyle, 'stroke.color')), 'rgba[3]'),
            strokeWidth: (0, _get2["default"])(imageStyle, 'stroke.width'),
            strokeLinecap: (0, _get2["default"])(imageStyle, 'stroke.lineCap'),
            strokeDashstyle: (0, _get2["default"])(imageStyle, 'stroke.lineDash'),
            fillColor: (0, _parseColor["default"])((0, _get2["default"])(imageStyle, 'fill.color')).hex,
            fillOpacity: (0, _get2["default"])((0, _parseColor["default"])((0, _get2["default"])(imageStyle, 'fill.color')), 'rgba[3]'),
            pointRadius: imageStyle.radius,
            externalGraphic: imageStyle.src,
            graphicWidth: (0, _get2["default"])(imageStyle, 'size[0]'),
            graphicHeight: (0, _get2["default"])(imageStyle, 'size[1]'),
            graphicOpacity: imageStyle instanceof _Icon["default"] ? imageStyle.opacity : undefined,
            // TODO not available in ol3?
            graphicXOffset: undefined,
            // TODO not available in ol3?
            graphicYOffset: undefined,
            rotation: imageStyle.rotation,
            // TODO Support full list of graphics: 'circle', 'square', 'star', 'x',
            // 'cross' and 'triangle'
            graphicName: 'circle'
          };
          break;

        case 'LineString':
        case 'MultiLineString':
          style = {
            strokeColor: (0, _parseColor["default"])(strokeStyle.color).hex,
            strokeOpacity: (0, _get2["default"])((0, _parseColor["default"])(strokeStyle.color), 'rgba[3]'),
            strokeWidth: strokeStyle.width,
            strokeLinecap: strokeStyle.lineCap,
            strokeDashstyle: strokeStyle.lineDash
          };
          break;

        case 'Polygon':
        case 'MultiPolygon':
        case 'Circle':
          style = {
            strokeColor: (0, _parseColor["default"])(strokeStyle.color).hex,
            strokeOpacity: (0, _get2["default"])((0, _parseColor["default"])(strokeStyle.color), 'rgba[3]'),
            strokeWidth: strokeStyle.width,
            strokeLinecap: strokeStyle.lineCap,
            strokeDashstyle: strokeStyle.lineDash,
            fillColor: (0, _parseColor["default"])(fillStyle.color).hex,
            fillOpacity: (0, _get2["default"])((0, _parseColor["default"])(fillStyle.color), 'rgba[3]')
          };
          break;

        default:
          // TODO some fallback style?!
          style = {};
      }

      if (textStyle && textStyle.text) {
        var parsedFont = (0, _parseCssFont["default"])(textStyle.font);
        style = _objectSpread({}, style, {}, {
          label: textStyle.text,
          fontFamily: parsedFont.family.join(','),
          fontSize: parsedFont.size,
          fontWeight: parsedFont.weight,
          fontStyle: parsedFont.style,
          fontColor: (0, _parseColor["default"])((0, _get2["default"])(textStyle, 'fill.color')).hex,
          fontOpacity: (0, _get2["default"])((0, _parseColor["default"])((0, _get2["default"])(textStyle, 'fill.color')), 'rgba[3]')
        });
      }

      return (0, _pickBy["default"])(style, function (v) {
        return v !== undefined;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "writeImageStyle", function (olImageStyle) {
      if (!(olImageStyle instanceof _Image["default"])) {
        return {};
      }

      if (olImageStyle instanceof _Circle["default"]) {
        return _this.writeCircleStyle(olImageStyle);
      }

      if (olImageStyle instanceof _Icon["default"]) {
        return _this.writeIconStyle(olImageStyle);
      }

      if (olImageStyle instanceof _RegularShape["default"]) {
        return _this.writeRegularShapeStyle(olImageStyle);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "writeCircleStyle", function (olCircleStyle) {
      if (!(olCircleStyle instanceof _Circle["default"])) {
        return {};
      }

      return {
        fill: _this.writeFillStyle(olCircleStyle.getFill()),
        image: _this.writeImageStyle(olCircleStyle.getImage()),
        opacity: olCircleStyle.getOpacity(),
        radius: olCircleStyle.getRadius(),
        rotateWithView: olCircleStyle.getRotateWithView(),
        rotation: olCircleStyle.getRotation(),
        scale: olCircleStyle.getScale(),
        stroke: _this.writeStrokeStyle(olCircleStyle.getStroke())
      };
    });

    _defineProperty(_assertThisInitialized(_this), "writeIconStyle", function (olIconStyle) {
      if (!(olIconStyle instanceof _Icon["default"])) {
        return {};
      }

      return {
        anchor: olIconStyle.getAnchor(),
        // getAnchor() returns the anchor in pixel values always, hence
        // we need to set the anchorUnits respectively
        anchorXUnits: 'pixels',
        anchorYUnits: 'pixels',
        anchorOrigin: olIconStyle.getOrigin(),
        opacity: olIconStyle.getOpacity(),
        rotateWithView: olIconStyle.getRotateWithView(),
        rotation: olIconStyle.getRotation(),
        scale: olIconStyle.getScale(),
        size: olIconStyle.getSize(),
        src: olIconStyle.getSrc()
      };
    });

    _defineProperty(_assertThisInitialized(_this), "writeRegularShapeStyle", function (olRegularShape) {
      if (!(olRegularShape instanceof _RegularShape["default"])) {
        return {};
      }

      return {
        angle: olRegularShape.getAngle(),
        fill: _this.writeFillStyle(olRegularShape.getFill()),
        opacity: olRegularShape.getOpacity(),
        points: olRegularShape.getPoints(),
        radius: olRegularShape.getRadius(),
        radius2: olRegularShape.getRadius2(),
        rotateWithView: olRegularShape.getRotateWithView(),
        rotation: olRegularShape.getRotation(),
        scale: olRegularShape.getScale(),
        stroke: _this.writeStrokeStyle(olRegularShape.getStroke())
      };
    });

    _defineProperty(_assertThisInitialized(_this), "writeFillStyle", function (olFillStyle) {
      if (!(olFillStyle instanceof _Fill["default"])) {
        return {};
      }

      return {
        color: olFillStyle.getColor()
      };
    });

    _defineProperty(_assertThisInitialized(_this), "writeStrokeStyle", function (olStrokeStyle) {
      if (!(olStrokeStyle instanceof _Stroke["default"])) {
        return {};
      }

      return {
        color: olStrokeStyle.getColor(),
        lineCap: olStrokeStyle.getLineCap(),
        lineJoin: olStrokeStyle.getLineJoin(),
        // If not set, getLineDash will return null.
        lineDash: olStrokeStyle.getLineDash() || undefined,
        lineDashOffeset: olStrokeStyle.getLineDashOffset(),
        miterLimit: olStrokeStyle.getMiterLimit(),
        width: olStrokeStyle.getWidth()
      };
    });

    _defineProperty(_assertThisInitialized(_this), "writeTextStyle", function (olTextStyle) {
      if (!(olTextStyle instanceof _Text["default"])) {
        return {};
      }

      return {
        fill: _this.writeFillStyle(olTextStyle.getFill()),
        font: olTextStyle.getFont(),
        offsetX: olTextStyle.getOffsetX(),
        offsetY: olTextStyle.getOffsetY(),
        rotation: olTextStyle.getRotation(),
        scale: olTextStyle.getScale(),
        stroke: _this.writeStrokeStyle(olTextStyle.getStroke()),
        text: olTextStyle.getText(),
        textAlign: olTextStyle.getTextAlign(),
        textBaseline: olTextStyle.getTextBaseline()
      };
    });

    return _this;
  }
  /**
   * Serializes/Encodes the given layer.
   *
   * @param {ol.layer.Layer} layer The layer to serialize/encode.
   * @param {Object} opts Additional properties to pass to the serialized
   *   layer object that can't be obtained by the layer itself. It can also be
   *   used to override all generated layer values, e.g. the image format.
   * @param {number} viewResolution The resolution to calculate the styles for.
   * @return {Object} The serialized/encoded layer.
   */


  _createClass(MapFishPrintV3GeoJsonSerializer, [{
    key: "serialize",
    value: function serialize(layer, opts, viewResolution) {
      var _this2 = this;

      (0, _defaultsDeep["default"])(opts, {
        failOnError: false,
        renderAsSvg: false
      });
      var source = layer.getSource();

      if (!this.validateSource(source)) {
        return;
      }

      var features = source.getFeatures();
      var format = new _GeoJSON["default"]();
      var serializedFeatures = [];
      var serializedStyles = {};
      var serializedStylesDict = {};
      var styleName;
      var styleId = 0;
      features.forEach(function (feature) {
        var geometry = feature.getGeometry();
        var geometryType = geometry.getType();
        var serializedFeature; // as GeoJSON format doesn't support circle geometries, we need to
        // transform circles to polygons.

        if (geometryType === _this2.constructor.CIRCLE_GEOMETRY_TYPE) {
          var style = feature.getStyle();
          var polyFeature = new _Feature["default"]((0, _Polygon.fromCircle)(geometry));
          polyFeature.setStyle(style);
          feature = polyFeature;
        }

        serializedFeature = format.writeFeatureObject(feature);
        var styles;
        var styleFunction = feature.getStyleFunction();

        if (styleFunction) {
          styles = styleFunction.call(feature, viewResolution);
        } else {
          styleFunction = layer.getStyleFunction();

          if (styleFunction) {
            styles = styleFunction.call(layer, feature, viewResolution);
          }
        } // assumption below: styles is an array of OlStyleStyle


        if (styles instanceof _Style["default"]) {
          styles = [styles];
        }

        if (styles) {
          serializedFeatures.push(serializedFeature);
          styles.forEach(function (style) {
            var styleObject = _this2.writeStyle(style, geometryType);

            var serializedStyle = JSON.stringify(styleObject);
            var dictStyle = serializedStylesDict[serializedStyle];

            if (dictStyle >= 0) {
              styleName = dictStyle;
            } else {
              serializedStylesDict[serializedStyle] = styleName = styleId++;
              serializedStyles[styleName] = styleObject;
            }

            if (!serializedFeature.properties) {
              serializedFeature.properties = {};
            } // serializedFeature.properties[this.constructor.FEAT_STYLE_PROPERTY] = styleName;

          });
        }
      });

      var serialized = _objectSpread({}, _get(_getPrototypeOf(MapFishPrintV3GeoJsonSerializer.prototype), "serialize", this).call(this, layer, opts, viewResolution), {}, {
        geoJson: {
          type: 'FeatureCollection',
          features: serializedFeatures
        },
        name: layer.get('name') || 'Vector Layer',
        opacity: layer.getOpacity(),
        // TODO Currently not supported, GeoStyler MapFish JSON StyleParser should
        // be used here!
        style: {},
        type: this.constructor.TYPE_GEOJSON
      }, {}, opts);

      return serialized;
    }
    /**
     * Returns a plain object matching the passed `ol.style.Style` instance.
     *
     * @param {ol.style.Style} olStyle An ol.style.Style instance.
     * @return {Object} A plain object matching the passed `ol.style.Style`
     *                  instance.
     */

  }]);

  return MapFishPrintV3GeoJsonSerializer;
}(_BaseSerializer2["default"]);

exports.MapFishPrintV3GeoJsonSerializer = MapFishPrintV3GeoJsonSerializer;

_defineProperty(MapFishPrintV3GeoJsonSerializer, "TYPE_GEOJSON", 'geojson');

_defineProperty(MapFishPrintV3GeoJsonSerializer, "CIRCLE_GEOMETRY_TYPE", 'Circle');

_defineProperty(MapFishPrintV3GeoJsonSerializer, "FEAT_STYLE_PROPERTY", '_style');

_defineProperty(MapFishPrintV3GeoJsonSerializer, "sourceCls", [_Vector["default"]]);

var _default = MapFishPrintV3GeoJsonSerializer;
exports["default"] = _default;