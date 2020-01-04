"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MapFishPrintV3Manager = void 0;

var _get2 = _interopRequireDefault(require("lodash/get"));

var _extent = require("ol/extent");

var _BaseMapFishPrintManager = _interopRequireDefault(require("./BaseMapFishPrintManager"));

var _MapFishPrintV3GeoJsonSerializer = _interopRequireDefault(require("../serializer/MapFishPrintV3GeoJsonSerializer"));

var _MapFishPrintV3OSMSerializer = _interopRequireDefault(require("../serializer/MapFishPrintV3OSMSerializer"));

var _MapFishPrintV3TiledWMSSerializer = _interopRequireDefault(require("../serializer/MapFishPrintV3TiledWMSSerializer"));

var _MapFishPrintV3WMSSerializer = _interopRequireDefault(require("../serializer/MapFishPrintV3WMSSerializer"));

var _MapFishPrintV3XYZSerializer = _interopRequireDefault(require("../serializer/MapFishPrintV3XYZSerializer"));

var _Shared = _interopRequireDefault(require("../util/Shared"));

var _Logger = _interopRequireDefault(require("../util/Logger"));

var _scales = _interopRequireDefault(require("../config/scales"));

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
 * The MapFishPrintV3Manager.
 *
 * @class
 */
var MapFishPrintV3Manager =
/*#__PURE__*/
function (_BaseMapFishPrintMana) {
  _inherits(MapFishPrintV3Manager, _BaseMapFishPrintMana);

  /**
   * The capabilities endpoint of the print service.
   *
   * @type {string}
   */

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
   * Custom parameters which can be additionally set on map to determine its
   * special handling while printing.
   *
   * The list of all allowed properties is as follows:
   *  * center (default)
   *  * dpi (default)
   *  * layers (default)
   *  * projection (default)
   *  * rotation (default)
   *  * scale (default)
   *  * areaOfInterest
   *  * bbox
   *  * useNearestScale
   *  * dpiSensitiveStyle
   *  * useAdjustBounds
   *  * width
   *  * longitudeFirst
   *  * zoomToFeatures
   *  * height
   *
   * Note: Properties marked as default will be handled by the manager itself
   * and don't need to be explicitly provided as customized params (s.
   * https://github.com/terrestris/mapfish-print-manager/blob/master/src/manager/MapFishPrintV3Manager.js#L416)
   *
   * Please refer to http://mapfish.github.io/mapfish-print-doc/attributes.html#!map
   * for further details.
   *
   * @type {Object}
   */

  /**
   * The supported print applications by the print service.
   *
   * @type {Array}
   * @private
   */

  /**
   * The currently selected print application.
   *
   * @type {Object}
   * @private
   */

  /**
   * ID of currently started print job. Will be used while polling will be
   * performed.
   *
   * @type {string}
   * @private
   */

  /**
   * ID of currently started print job. Will be used while polling will be
   * performed.
   *
   * @type {string}
   * @private
   */

  /**
   * Override layer from config
   *
   * @type {Array}
   * @private
   */

  /**
   * Override legend from config
   *
   * @type {Array}
   * @private
   */

  /**
   * The constructor
   */
  function MapFishPrintV3Manager() {
    var _this;

    _classCallCheck(this, MapFishPrintV3Manager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MapFishPrintV3Manager).call(this, arguments));

    _defineProperty(_assertThisInitialized(_this), "serializers", [_MapFishPrintV3GeoJsonSerializer["default"], _MapFishPrintV3OSMSerializer["default"], _MapFishPrintV3TiledWMSSerializer["default"], _MapFishPrintV3WMSSerializer["default"], _MapFishPrintV3XYZSerializer["default"]]);

    _defineProperty(_assertThisInitialized(_this), "customMapParams", {});

    _defineProperty(_assertThisInitialized(_this), "_printApps", []);

    _defineProperty(_assertThisInitialized(_this), "_printApp", {});

    _defineProperty(_assertThisInitialized(_this), "_printJobReference", null);

    _defineProperty(_assertThisInitialized(_this), "_reportName", 'report');

    _defineProperty(_assertThisInitialized(_this), "customLayers", []);

    _defineProperty(_assertThisInitialized(_this), "customLegends", []);

    _defineProperty(_assertThisInitialized(_this), "setPrintApp", function (printAppName) {
      var printApp = _this.getPrintApps().find(function (pa) {
        return pa === printAppName;
      });

      if (!printApp) {
        _Logger["default"].warn("No print application named '".concat(printAppName, "' found."));

        return;
      }

      _this._printApp = printApp;

      _this.dispatch('change:app', printApp); // reinit print manager with capabilities from set app


      return _this.loadAppCapabilities(printApp).then(function (printCapabilities) {
        _this.initManager(printCapabilities);

        return Promise.resolve(true);
      })["catch"](function (error) {
        return Promise.reject(new Error("".concat(error.message)));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "setDpi", function (value) {
      value = parseFloat(value);

      var dpi = _this.getDpis().find(function (dpi) {
        return dpi === value;
      });

      if (!dpi) {
        _Logger["default"].warn("No dpi '".concat(value, "' found."));

        return;
      }

      _this._dpi = dpi;

      _this.dispatch('change:dpi', dpi);
    });

    return _this;
  }
  /**
   * Initializes the manager.
   *
   * @return {Promise}
   */


  _createClass(MapFishPrintV3Manager, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.url && !this.capabilities) {
        return this.loadPrintApps().then(function (printApps) {
          _this2.setPrintApps(printApps);

          var defaultPrintApp = _this2.getPrintApps()[0];

          return _this2.setPrintApp(defaultPrintApp);
        })["catch"](function (error) {
          return Promise.reject(new Error("Could not initialize " + "the manager: ".concat(error.message)));
        });
      } else if (!this.url && this.capabilities) {
        return this.initManager(this.capabilities);
      }
    }
    /**
     *
     * @param {*} capabilities
     */

  }, {
    key: "initManager",
    value: function initManager(capabilities) {
      this.capabilities = capabilities;
      this._layouts = capabilities.layouts;
      this._outputFormats = capabilities.formats;
      this.setLayout(this.getLayouts()[0].name);
      this.setOutputFormat(this.getOutputFormats()[0]); // mapfish3 doesn't provide scales via capabilities, so we get them from
      // initialized manager if set or set some most common used values here
      // manually as fallback

      if (this.customPrintScales.length > 0) {
        this._scales = this.customPrintScales;
      } else {
        this._scales = _scales["default"];
      }

      this.setScale(this.getClosestScaleToFitMap());
      this.initPrintExtentLayer();
      this.initPrintExtentFeature();
      this.initTransformInteraction();
      this._initiated = true;
      return this.isInitiated();
    }
    /**
     * Returns attribute value contained in currently chosen layout by its name.
     *
     * @param {string} attributeName The attribute name (key) to be searched.
     * @param {string} layoutName Name of currently chosen layout.
     *
     * @return {*} Obtained attribute value.
     */

  }, {
    key: "getAttributeByName",
    value: function getAttributeByName(attributeName) {
      var layoutName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getLayout().name;
      var layout = this.getLayoutByName(layoutName);
      var layoutAttributes = layout.attributes;
      var attribute = layoutAttributes.find(function (layoutAttribute) {
        return layoutAttribute.name === attributeName;
      });
      return attribute;
    }
    /**
     * Returns an object containing configuration for layout based on its name
     *
     * @param {string} layoutName Layout name.
     *
     * @return {Object} Layout configuration object.
     */

  }, {
    key: "getLayoutByName",
    value: function getLayoutByName(layoutName) {
      var layouts = this.getLayouts();
      return layouts.find(function (layout) {
        return layout.name === layoutName;
      });
    }
    /**
     * Returns all available print applications.
     *
     * @return {Promise} Promise containing available print apps.
     */

  }, {
    key: "loadPrintApps",
    value: function loadPrintApps() {
      var _this3 = this;

      return fetch("".concat(this.url).concat(this.constructor.APPS_JSON_ENDPOINT), {
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
        return Promise.reject(new Error("Error while fetching the " + "print apps: ".concat(error.message)));
      });
    }
    /**
     * Loads the print capabilities from the provided remote source.
     *
     * @return {Promise}
     */

  }, {
    key: "loadAppCapabilities",
    value: function loadAppCapabilities(printApp) {
      var _this4 = this;

      var capEndpoint = this.constructor.CAPABILITIES_JSON_ENDPOINT;
      var url = "".concat(this.url).concat(printApp, "/").concat(capEndpoint);
      return fetch(url, {
        method: 'GET',
        headers: _objectSpread({
          'Content-Type': 'application/json'
        }, this.headers),
        credentials: this.credentialsMode
      }).then(function (response) {
        return _this4.validateResponse(response);
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        return Promise.resolve(json);
      })["catch"](function (error) {
        return Promise.reject(new Error("Error while fetching the " + "print capabilities: ".concat(error.message)));
      });
    }
    /**
     *
     *
     * @param {boolean} forceDownload
     * @return {Promise}
     */

  }, {
    key: "print",
    value: function print(forceDownload) {
      var _this5 = this;

      if (!this.isInitiated()) {
        _Logger["default"].warn('The manager hasn\'t been initiated yet. Please call init() first.');

        return;
      }

      var payload = this.getPrintPayload();
      var createPrintJobUrl = "".concat(this.url).concat(this.getPrintApp(), "/").concat(this.getReportName(), ".").concat(this.getOutputFormat());
      return fetch(createPrintJobUrl, {
        method: 'POST',
        headers: _objectSpread({
          'Content-Type': 'application/json'
        }, this.headers),
        credentials: this.credentialsMode,
        body: JSON.stringify(payload)
      }).then(function (response) {
        return _this5.validateResponse(response);
      }).then(function (response) {
        return response.json();
      }).then(function (json) {
        var ref = json.ref,
            statusURL = json.statusURL; // get absolute url of print status and download to ensure we will be
        // redirected correctly while printing

        var matches = _this5.url.match(/[^/](\/[^/].*)/);

        var baseHost = '';

        if (matches && matches[1]) {
          var idx = _this5.url.indexOf(matches[1]);

          baseHost = _this5.url.substring(0, idx);
        }

        _this5._printJobReference = ref;
        return _this5.pollUntilDone.call(_this5, baseHost + statusURL, 1000, _this5.timeout).then(function (downloadUrl) {
          _this5._printJobReference = null;

          if (forceDownload) {
            _this5.download(baseHost + downloadUrl);
          } else {
            return Promise.resolve(baseHost + downloadUrl);
          }
        })["catch"](function (error) {
          _this5._printJobReference = null;

          _Logger["default"].error(error);
        });
      })["catch"](function (error) {
        return Promise.reject("Error while creating the print job: ".concat(error.message));
      });
    }
    /**
     *
     *
     * @param {*} url
     * @param {*} interval
     * @param {*} timeout
     * @return {Promise}
     */

  }, {
    key: "pollUntilDone",
    value: function pollUntilDone(url, interval, timeout) {
      var start = Date.now();
      /**
       * @ignore
       */

      function run() {
        var _this6 = this;

        return fetch(url, {
          method: 'GET',
          headers: _objectSpread({}, this.headers),
          credentials: this.credentialsMode
        }).then(function (response) {
          return _this6.validateResponse(response);
        }).then(function (response) {
          return response.json();
        }).then(function (json) {
          var status = json.status;

          if (status === 'finished') {
            return Promise.resolve(json.downloadURL);
          } else if (status === 'error') {
            return Promise.reject(new Error("There was an error executing the job: ".concat(json.error)));
          } else if (status === 'cancelled') {
            return Promise.reject(new Error('The job was cancelled.'));
          } else if (['waiting', 'running'].includes(status)) {
            if (timeout !== 0 && Date.now() - start > timeout) {
              return Promise.reject(new Error('timeout error on pollUntilDone'));
            } else {
              return new Promise(function (resolve) {
                setTimeout(resolve, interval);
              }).then(run.bind(_this6));
            }
          }
        });
      }

      return run.call(this);
    }
    /**
     * Cancels current print job by id.
     *
     * @param {string} id Print id to cancel.
     *
     * @return {Promise}
     *
     */

  }, {
    key: "cancelPrint",
    value: function cancelPrint(id) {
      var _this7 = this;

      if (!id) {
        return;
      }

      var cancelPrintJobUrl = "".concat(this.url, "cancel/").concat(id);
      return fetch(cancelPrintJobUrl, {
        method: 'DELETE',
        headers: _objectSpread({}, this.headers),
        credentials: this.credentialsMode
      }).then(function (response) {
        return _this7.validateResponse(response);
      }).then(function () {
        return Promise.resolve();
      })["catch"](function () {
        return Promise.reject();
      });
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
      var _this8 = this;

      var mapView = this.map.getView();
      var mapProjection = mapView.getProjection();

      var mapLayers = _Shared["default"].getMapLayers(this.map);

      var extentFeatureGeometry = this._extentFeature.getGeometry();

      var r = new RegExp('^(?:[a-z]+:)?//', 'i');
      var serializedLayers;

      if (!this.customMapParams.layers || !this.customMapParams.layers.length) {
        serializedLayers = mapLayers.filter(this.filterPrintableLayer.bind(this)).reduce(function (acc, layer) {
          var serializedLayer = _this8.serializeLayer(layer);

          if (serializedLayer) {
            acc.push(serializedLayer);
          }

          return acc;
        }, []).reverse();
        serializedLayers.forEach(function (l) {
          if (!r.test(l.baseURL)) {
            l.baseURL = _this8.host + l.baseURL;
          }
        });
      } else {
        serializedLayers = this.customMapParams.layers;
      }

      var serializedLegends;

      if (!(this.customParams.legend && this.customParams.legend.classes)) {
        serializedLegends = mapLayers.filter(this.filterPrintableLegend.bind(this)).reduce(function (acc, layer) {
          var serializedLegend = _this8.serializeLegend(layer);

          if (serializedLegend) {
            acc.push(serializedLegend);
          }

          return acc;
        }, []).reverse();
      } else {
        serializedLegends = this.customParams.legend.classes;
      }

      var customMapP = Object.assign({}, this.customMapParams);
      delete customMapP.layers;
      var payload = {
        layout: this.getLayout().name,
        attributes: _objectSpread({
          map: _objectSpread({
            center: (0, _extent.getCenter)(extentFeatureGeometry.getExtent()),
            dpi: this.getDpi(),
            layers: serializedLayers,
            projection: mapProjection.getCode(),
            rotation: this.calculateRotation() || 0,
            scale: this.getScale()
          }, customMapP),
          legend: {
            classes: serializedLegends
          }
        }, this.customParams)
      };
      return payload;
    }
    /**
     * Returns all supported print applications.
     *
     * @return {Array} The supported print applications.
     */

  }, {
    key: "getPrintApps",
    value: function getPrintApps() {
      return this._printApps;
    }
    /**
     * Sets the supported print applications.
     *
     * @param {Array} printApps The supported print applications to set.
     */

  }, {
    key: "setPrintApps",
    value: function setPrintApps(printApps) {
      this._printApps = printApps;
    }
    /**
     * Returns the currently selected print application.
     *
     * @return {string} The currently selected print application.
     */

  }, {
    key: "getPrintApp",
    value: function getPrintApp() {
      return this._printApp;
    }
    /**
     * Returns report filename.
     *
     * @return {string} The currently namefile.
     */

  }, {
    key: "getReportName",
    value: function getReportName() {
      return this._reportName;
    }
    /**
     * Sets the supported print applications.
     *
     * @param {string} reportName The name of the report file.
     */

  }, {
    key: "setReportName",
    value: function setReportName(reportName) {
      this._reportName = reportName;
    }
    /**
     * Sets the layout to use. Updates the print extent accordingly.
     *
     * @param {string} name The name of the layout to use.
     */

  }, {
    key: "setLayout",
    value: function setLayout(name) {
      var layout = this.getLayouts().find(function (layout) {
        return layout.name === name;
      });

      if (!layout) {
        _Logger["default"].warn("No layout named '".concat(name, "' found."));

        return;
      }

      this._layout = layout;
      var mapAttribute = this.getAttributeByName('map');
      this._dpis = (0, _get2["default"])(mapAttribute, 'clientInfo.dpiSuggestions'); // set some defaults if not provided via capabilities

      if (!this._dpis) {
        this._dpis = [72, 150];
      }

      this.setDpi(this.getDpis()[0]);
      this.setPrintMapSize({
        width: (0, _get2["default"])(mapAttribute, 'clientInfo.width'),
        height: (0, _get2["default"])(mapAttribute, 'clientInfo.height')
      });
      this.updatePrintExtent();
      this.dispatch('change:layout', layout);
    }
    /**
     * Sets the print application to use.
     * For each print app the appropriate capabilities will be load and the
     * manager will be initialized afterwards.
     *
     * @param {string} printAppName The name of the application to use.
     */

  }, {
    key: "serializeLegend",

    /**
     * Serializes/encodes the legend payload for the given layer.
     *
     * @param {ol.layer.Layer} layer The layer to serialize/encode the legend for.
     *
     * @return {Object} The serialized/encoded legend.
     */
    value: function serializeLegend(layer) {
      var _this9 = this;

      var r = new RegExp('^(?:[a-z]+:)?//', 'i');

      if (layer.hasOwnProperty('getLayerLegend')) {
        console.log('legenda da funzione');
        var l_url = layer.getLayerLegend(this.map.getView().getResolution());

        if (!r.test(l_url)) {
          l_url = this.host + l_url;
        }

        return {
          name: layer.get('name'),
          icons: [l_url]
        };
      }

      var legends = layer.get('legend');

      if (legends) {
        if (Array.isArray(legends)) {
          legends = legends.reduce(function (acc, leg) {
            if (leg.url) {
              if (!r.test(leg.url)) {
                leg.url = _this9.host + leg.url;
              }

              acc.push(leg.url);
            }

            return acc;
          }, []);
          return {
            name: layer.get('name'),
            icons: legends
          };
        } else {
          var _l_url = layer.get('legend');

          if (!r.test(_l_url)) {
            _l_url = this.host + _l_url;
          }

          return {
            name: layer.get('name'),
            icons: [_l_url]
          };
        }
      }

      return _get(_getPrototypeOf(MapFishPrintV3Manager.prototype), "serializeLegend", this).call(this, layer);
    }
  }]);

  return MapFishPrintV3Manager;
}(_BaseMapFishPrintManager["default"]);

exports.MapFishPrintV3Manager = MapFishPrintV3Manager;

_defineProperty(MapFishPrintV3Manager, "APPS_JSON_ENDPOINT", 'apps.json');

_defineProperty(MapFishPrintV3Manager, "CAPABILITIES_JSON_ENDPOINT", 'capabilities.json');

var _default = MapFishPrintV3Manager;
exports["default"] = _default;