"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MapFishPrintV2Manager = void 0;

var _extent = require("ol/extent");

var _TileWMS = _interopRequireDefault(require("ol/source/TileWMS"));

var _ImageWMS = _interopRequireDefault(require("ol/source/ImageWMS"));

var _BaseMapFishPrintManager = _interopRequireDefault(require("./BaseMapFishPrintManager"));

var _MapFishPrintV2WMSSerializer = _interopRequireDefault(require("../serializer/MapFishPrintV2WMSSerializer"));

var _MapFishPrintV2VectorSerializer = _interopRequireDefault(require("../serializer/MapFishPrintV2VectorSerializer"));

var _Shared = _interopRequireDefault(require("../util/Shared"));

var _Logger = _interopRequireDefault(require("../util/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The MapFishPrintV2Manager.
 *
 * @class
 */
var MapFishPrintV2Manager =
/*#__PURE__*/
function (_BaseMapFishPrintMana) {
  _inherits(MapFishPrintV2Manager, _BaseMapFishPrintMana);

  /**
   * The capabilities endpoint of the print service.
   *
   * @type {string}
   */

  /**
   * The layer serializers to use. May be overridden or extented to obtain
   * custom functionality.
   *
   * @type {Array}
   */

  /**
   * The constructor
   */
  function MapFishPrintV2Manager() {
    var _this;

    _classCallCheck(this, MapFishPrintV2Manager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapFishPrintV2Manager).call(this, arguments));

    _defineProperty(_assertThisInitialized(_this), "serializers", [_MapFishPrintV2WMSSerializer["default"], _MapFishPrintV2VectorSerializer["default"]]);

    _defineProperty(_assertThisInitialized(_this), "setScale", function (name) {
      var scale = _this.getScales().find(function (scale) {
        return scale.name === name;
      });

      if (!scale) {
        _Logger["default"].warn("No scale named '".concat(name, "' found."));

        return;
      }

      _this._scale = scale;

      _this.updatePrintExtent();

      _this.dispatch('change:scale', scale);
    });

    return _this;
  }
  /**
   * Initializes the manager.
   *
   * @return {Promise}
   */


  _createClass(MapFishPrintV2Manager, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (!this.url && this.capabilities) {
        return this.initManager(this.capabilities);
      } else if (this.url && !this.capabilities) {
        return this.loadCapabilities().then(function (json) {
          return Promise.resolve(_this2.initManager(json));
        })["catch"](function (error) {
          return Promise.reject(new Error("Could not initialize " + "the manager: ".concat(error.message)));
        });
      }
    }
    /**
     * Initializes the manager instance. Typically called by subclasses via init().
     *
     * TODO Implement as interface (-> TS) and move to MapFishPrintV2Manager
     * TODO Check return type Boolean?
     *
     * @param {Object} capabilities The capabilities to set.
     *
     * @return {boolean}
     */

  }, {
    key: "initManager",
    value: function initManager(capabilities) {
      this.capabilities = capabilities;
      this._layouts = this.capabilities.layouts;
      this._outputFormats = this.capabilities.outputFormats;
      this._dpis = this.capabilities.dpis;
      this._scales = this.capabilities.scales;
      this.setLayout(this.getLayouts()[0].name);
      this.setOutputFormat(this.getOutputFormats()[0].name);
      this.setDpi(this.getDpis()[0].name);
      this.setScale(this.getClosestScaleToFitMap().name);
      this.initPrintExtentLayer();
      this.initPrintExtentFeature();
      this.initTransformInteraction();
      this._initiated = true;
      return this.isInitiated();
    }
    /**
     * Loads the print capabilities from the provided remote source.
     *
     * @return {Promise}
     */

  }, {
    key: "loadCapabilities",
    value: function loadCapabilities() {
      var _this3 = this;

      return fetch(this.url + this.constructor.INFO_JSON_ENDPOINT, {
        method: 'GET',
        headers: _objectSpread({
          'Content-Type': 'application/json'
        }, this.headers),
        credentials: this.credentialsMode
      }).then(function (response) {
        return _this3.validateResponse(response);
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        return Promise.resolve(json);
      })["catch"](function (error) {
        return Promise.reject(new Error("Error while fetching the " + "print capabilities: ".concat(error.message)));
      });
    }
    /**
     * Calls the print servlet to create a output file in the requested format
     * and forces a download of the created output.
     *
     * Note: The manager has to been initialized prior this method's usage.
     *
     * @param {boolean} forceDownload Whether to force a direct download of the
     *                                print result or to return the download url.
     * @return {Promise|undefined} If forceDownload is set to false, the download
     *                             url of the print result will be returned in a
     *                             Promise.
     */

  }, {
    key: "print",
    value: function print(forceDownload) {
      var _this4 = this;

      if (!this.isInitiated()) {
        _Logger["default"].warn('The manager hasn\'t been initiated yet. Please call init() first.');

        return;
      }

      var payload = this.getPrintPayload();

      if (this.method === 'GET') {
        var url = "".concat(this.capabilities.printURL, "?spec=").concat(encodeURIComponent(JSON.stringify(payload)));

        if (forceDownload) {
          this.download(url);
        } else {
          return url;
        }
      } else {
        return fetch(this.capabilities.createURL, {
          method: this.method,
          headers: _objectSpread({
            'Content-Type': 'application/json'
          }, this.headers),
          credentials: this.credentialsMode,
          body: JSON.stringify(payload)
        }).then(function (response) {
          return _this4.validateResponse(response);
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          var url = json.getURL;

          if (forceDownload) {
            _this4.download(url);
          } else {
            return Promise.resolve(url);
          }
        })["catch"](function (error) {
          return Promise.reject("Error while creating the print document: ".concat(error.message));
        });
      }
    }
    /**
     * Collects the payload that is required for the print call to the print
     * servlet.
     *
     * @return {Object} The print payload.
     */

  }, {
    key: "getPrintPayload",
    value: function getPrintPayload() {
      var _this5 = this;

      var mapView = this.map.getView();
      var mapProjection = mapView.getProjection();

      var mapLayers = _Shared["default"].getMapLayers(this.map);

      var extentFeatureGeometry = this._extentFeature.getGeometry();

      var serializedLayers = mapLayers.filter(this.filterPrintableLayer.bind(this)).reduce(function (acc, layer) {
        var serializedLayer = _this5.serializeLayer(layer);

        if (serializedLayer) {
          acc.push(serializedLayer);
        }

        return acc;
      }, []);
      var serializedLegends = mapLayers.filter(this.filterPrintableLegend.bind(this)).reduce(function (acc, layer) {
        var serializedLegend = _this5.serializeLegend(layer);

        if (serializedLegend) {
          acc.push(serializedLegend);
        }

        return acc;
      }, []);

      var payload = _objectSpread({
        units: mapProjection.getUnits(),
        srs: mapProjection.getCode(),
        layout: this.getLayout().name,
        outputFormat: this.getOutputFormat().name,
        dpi: this.getDpi().value,
        layers: serializedLayers,
        pages: [{
          center: (0, _extent.getCenter)(extentFeatureGeometry.getExtent()),
          scale: this.getScale().value,
          rotation: this.calculateRotation() || 0
        }],
        legends: serializedLegends
      }, this.customParams);

      return payload;
    }
    /**
     * Serializes/encodes the legend payload for the given layer.
     *
     * @param {ol.layer.Layer} layer The layer to serialize/encode the legend for.
     *
     * @return {Object} The serialized/encoded legend.
     */

  }, {
    key: "serializeLegend",
    value: function serializeLegend(layer) {
      if (layer.getSource() instanceof _TileWMS["default"] || layer.getSource() instanceof _ImageWMS["default"]) {
        return {
          name: layer.get('name') || layer.getSource().getParams().LAYERS || '',
          classes: [{
            name: '',
            icons: [_Shared["default"].getLegendGraphicUrl(layer)]
          }]
        };
      }
    }
    /**
     * Called on translate interaction's `scaling` event.
     */

  }, {
    key: "onTransformScaling",
    value: function onTransformScaling() {
      var scale = this.getClosestScaleToFitExtentFeature();
      this.setScale(scale.name);
    }
    /**
     * Calculates the extent based on a scale.
     * Overrides the method from base class.
     *
     * @param {number} scale The scale to calculate the extent for. If not given,
     *                       the current scale of the provider will be used.
     * @return {ol.Extent} The extent.
     */

  }, {
    key: "calculatePrintExtent",
    value: function calculatePrintExtent(scale) {
      var printMapSize = this.getLayout().map;
      var printScale = scale || this.getScale().value;

      var _this$getPrintExtentS = this.getPrintExtentSize(printMapSize, printScale),
          width = _this$getPrintExtentS.width,
          height = _this$getPrintExtentS.height;

      var center;

      if (this._extentFeature) {
        center = (0, _extent.getCenter)(this._extentFeature.getGeometry().getExtent());
      } else {
        center = this.map.getView().getCenter();
      }

      var printExtent = [center[0] - width / 2, center[1] - height / 2, center[0] + width / 2, center[1] + height / 2];
      return printExtent;
    }
    /**
     * Sets the output format to use.
     * Overrides the method from base class.
     *
     * @param {string} name The name of the output format to use.
     */

  }, {
    key: "setOutputFormat",
    value: function setOutputFormat(name) {
      var format = this.getOutputFormats().find(function (format) {
        return format.name === name;
      });

      if (!format) {
        _Logger["default"].warn("No output format named '".concat(name, "' found."));

        return;
      }

      this._outputFormat = format;
      this.dispatch('change:outputformat', format);
    }
    /**
     * Sets the scale to use. Updates the print extent accordingly.
     * Overrides the method from base class.
     *
     * @param {string} name The name of the scale to use.
     */

  }]);

  return MapFishPrintV2Manager;
}(_BaseMapFishPrintManager["default"]);

exports.MapFishPrintV2Manager = MapFishPrintV2Manager;

_defineProperty(MapFishPrintV2Manager, "INFO_JSON_ENDPOINT", 'info.json');

var _default = MapFishPrintV2Manager;
exports["default"] = _default;