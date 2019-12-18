"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BaseMapFishPrintManager = void 0;

var _Map = _interopRequireDefault(require("ol/Map"));

var _Layer = _interopRequireDefault(require("ol/layer/Layer"));

var _Vector = _interopRequireDefault(require("ol/layer/Vector"));

var _TileWMS = _interopRequireDefault(require("ol/source/TileWMS"));

var _ImageWMS = _interopRequireDefault(require("ol/source/ImageWMS"));

var _Vector2 = _interopRequireDefault(require("ol/source/Vector"));

var _Feature = _interopRequireDefault(require("ol/Feature"));

var _Polygon = require("ol/geom/Polygon");

var _extent = require("ol/extent");

var _Style = _interopRequireDefault(require("ol/style/Style"));

var _Fill = _interopRequireDefault(require("ol/style/Fill"));

var _InteractionTransform = _interopRequireDefault(require("../interaction/InteractionTransform"));

var _Shared = _interopRequireDefault(require("../util/Shared"));

var _Logger = _interopRequireDefault(require("../util/Logger"));

var _Observable2 = _interopRequireDefault(require("../observable/Observable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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
 * The BaseMapFishPrintManager.
 *
 * @fires {change:layout | change:outputformat | change:dpi | change:scale}
 * @class
 */
var BaseMapFishPrintManager =
/*#__PURE__*/
function (_Observable) {
  _inherits(BaseMapFishPrintManager, _Observable);

  /**
   * The name of the vector layer configured and created by the print manager.
   *
   * @type {string}
   */

  /**
   * The name of the transform interaction configured and created by the
   * print manager.
   *
   * @type {string}
   */

  /**
   * The key in the layer properties to lookup for custom serializer options.
   *
   * @type {string}
   */

  /**
   * The map this PrintManager is bound to. Required.
   *
   * @type {ol.Map}
   */

  /**
   * Base url of the print service.
   *
   * @type {string}
   */

  /**
   * The capabilities of the print service. Either filled automatically out of
   * the the given print service or given manually.
   *
   * @type {Object}
   */

  /**
   * Method to use when sending print requests to the servlet. Either `POST` or
   * `GET` (case-sensitive). Default is to `POST`.
   *
   * @type {string}
   */

  /**
   * Additional headers to be send to the print servlet.
   *
   * @type {Object}
   */

  /**
   * The authentication credentials mode. Default is to 'same-origin'.
   *
   * @type {string}
   */

  /**
   * Key-value pairs of custom data to be sent to the print service. This is
   * e.g. useful for complex layout definitions on the server side that
   * require additional parameters. Optional.
   *
   * @type {Object}
   */

  /**
   * The layer to show the actual print extent on. If not provided, a default
   * one will be created.
   *
   * @type {ol.Layer.Vector}
   */

  /**
   * The color to apply to the mask around the extent feature. Will be applied
   * to the default extentLayer only. If you don't want the mask to be shown on
   * the map, provide a custom extentLayer.
   *
   * @type {string}
   */

  /**
   * Custom options to apply to the transform interaction. See
   * http://viglino.github.io/ol-ext/doc/doc-pages/ol.interaction.Transform.html
   * for valid options.
   *
   * @type {Object}
   */

  /**
   * A filter function that will be called before the print call. Should
   * return a Boolean whether to serialize a layer for print or not.
   *
   * @type {Function}
   */

  /**
   * A filter function that will be called before the print call. Should
   * return a Boolean whether to serialize a legend of a layer for print or not.
   *
   * @type {Function}
   */

  /**
   * An array determining custom print scales. If provided, these will override
   * the scales retrieved from print capabilities.
   *
   * @type {Array}
   */

  /**
   * Default timeout in ms after which print job polling will be canceled.
   *
   * @type {number}
   */

  /**
   * The supported layouts by the print service.
   *
   * @type {Array}
   * @private
   */

  /**
   * The supported output formats by the print service.
   *
   * @type {Array}
   * @private
   */

  /**
   * The supported DPIs by the print service.
   *
   * @type {Array}
   * @private
   */

  /**
   * The supported scales by the print service.
   *
   * @type {Array}
   * @private
   */

  /**
   * The currently selected layout.
   *
   * @type {Object}
   * @private
   */

  /**
   * The currently selected output format.
   *
   * @type {Object}
   * @private
   */

  /**
   * The currently selected dpi.
   *
   * @type {Object}
   * @private
   */

  /**
   * The currently selected scale.
   *
   * @type {Object}
   * @private
   */

  /**
   * The currently set map size defined with its width and height.
   *
   * @type {Object}
   * @private
   */

  /**
   * Whether this manger has been initiated or not.
   *
   * @type {boolean}
   * @private
   */

  /**
   * Feature representing the page extent.
   *
   * @type {ol.Feature}
   * @private
   */

  /**
   * The constructor
   */
  function BaseMapFishPrintManager(opts) {
    var _this;

    _classCallCheck(this, BaseMapFishPrintManager);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseMapFishPrintManager).call(this, opts));

    _defineProperty(_assertThisInitialized(_this), "map", null);

    _defineProperty(_assertThisInitialized(_this), "url", null);

    _defineProperty(_assertThisInitialized(_this), "host", '');

    _defineProperty(_assertThisInitialized(_this), "capabilities", null);

    _defineProperty(_assertThisInitialized(_this), "method", 'POST');

    _defineProperty(_assertThisInitialized(_this), "headers", {});

    _defineProperty(_assertThisInitialized(_this), "credentialsMode", 'same-origin');

    _defineProperty(_assertThisInitialized(_this), "customParams", {});

    _defineProperty(_assertThisInitialized(_this), "extentLayer", null);

    _defineProperty(_assertThisInitialized(_this), "maskColor", 'rgba(118,133,148,1)');

    _defineProperty(_assertThisInitialized(_this), "transformOpts", {});

    _defineProperty(_assertThisInitialized(_this), "layerFilter", function () {
      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "legendFilter", function () {
      return true;
    });

    _defineProperty(_assertThisInitialized(_this), "customPrintScales", []);

    _defineProperty(_assertThisInitialized(_this), "timeout", 5000);

    _defineProperty(_assertThisInitialized(_this), "_layouts", []);

    _defineProperty(_assertThisInitialized(_this), "_outputFormats", []);

    _defineProperty(_assertThisInitialized(_this), "_dpis", []);

    _defineProperty(_assertThisInitialized(_this), "_scales", []);

    _defineProperty(_assertThisInitialized(_this), "_layout", {});

    _defineProperty(_assertThisInitialized(_this), "_outputFormat", {});

    _defineProperty(_assertThisInitialized(_this), "_dpi", {});

    _defineProperty(_assertThisInitialized(_this), "_scale", {});

    _defineProperty(_assertThisInitialized(_this), "_printMapSize", {});

    _defineProperty(_assertThisInitialized(_this), "_initiated", false);

    _defineProperty(_assertThisInitialized(_this), "_extentFeature", null);

    _defineProperty(_assertThisInitialized(_this), "setDpi", function (name) {
      var dpi = _this.getDpis().find(function (dpi) {
        return dpi.name === name;
      });

      if (!dpi) {
        _Logger["default"].warn("No dpi named '".concat(name, "' found."));

        return;
      }

      _this._dpi = dpi;

      _this.dispatch('change:dpi', dpi);
    });

    Object.assign.apply(Object, [_assertThisInitialized(_this)].concat(_toConsumableArray(opts)));

    if (!(_this.map.constructor.name === _Map["default"].prototype.className)) {
      _Logger["default"].warn('Invalid value given to config option `map`. You need to ' + 'provide an ol.Map to use the PrintManager.');
    }

    if (!_this.url && !_this.capabilities) {
      _Logger["default"].warn('Invalid init options given. Please provide either an `url` ' + 'or `capabilities`.');
    }

    if (_this.url && _this.url.split('/').pop()) {
      _this.url += '/';
    }

    return _this;
  }
  /**
   * Shuts down the manager.
   */


  _createClass(BaseMapFishPrintManager, [{
    key: "shutdownManager",
    value: function shutdownManager() {
      var _this2 = this;

      // Remove print layer from map. But only if not given by user.
      var layerCandidates = _Shared["default"].getLayersByName(this.map, this.constructor.EXTENT_LAYER_NAME);

      console.log(layerCandidates);
      layerCandidates.forEach(function (layer) {
        return _this2.map.removeLayer(layer);
      }); // Remove transform interaction from map.

      var interactionCandidates = _Shared["default"].getInteractionsByName(this.map, this.constructor.TRANSFORM_INTERACTION_NAME);

      interactionCandidates.forEach(function (interaction) {
        return _this2.map.removeInteraction(interaction);
      });
    }
    /**
     * Validates the given HTTP fetch response.
     *
     * @param {Response} response The response to validate.
     *
     * @return {Promise} The resolved or rejected promise.
     */

  }, {
    key: "validateResponse",
    value: function validateResponse(response) {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error("Error while trying to request " + "".concat(response.url, " (").concat(response.status, ": ").concat(response.statusText, ")")));
      }
    }
    /**
     * Initializes the print extent layer.
     */

  }, {
    key: "initPrintExtentLayer",
    value: function initPrintExtentLayer() {
      if (!(this.extentLayer instanceof _Vector["default"])) {
        var extentLayer = new _Vector["default"]({
          name: this.constructor.EXTENT_LAYER_NAME,
          source: new _Vector2["default"](),
          style: new _Style["default"]({
            fill: new _Fill["default"]({
              color: 'rgba(0,102,204,0.2)'
            })
          })
        });
        /* extentLayer.on('precompose', this.onExtentLayerPreCompose.bind(this));
         extentLayer.on('postcompose', this.onExtentLayerPostCompose.bind(this));*/

        this.extentLayer = extentLayer;

        if (_Shared["default"].getLayersByName(this.map, this.constructor.EXTENT_LAYER_NAME).length === 0) {
          this.map.addLayer(this.extentLayer);
        }
      }
    }
    /**
     * Called on the extentLayer's `precompose` event.
     *
     * @param {ol.render.Event} olEvt The ol render event.
     */

  }, {
    key: "onExtentLayerPreCompose",
    value: function onExtentLayerPreCompose(olEvt) {
      var ctx = olEvt.context;
      ctx.save();
    }
    /**
     * Called on the extentLayer's `postcompose` event.
     *
     * @param {ol.render.Event} olEvt The ol render event.
     */

  }, {
    key: "onExtentLayerPostCompose",
    value: function onExtentLayerPostCompose(olEvt) {
      var ctx = olEvt.context;
      var canvas = ctx.canvas;
      var width = canvas.width;
      var height = canvas.height;
      var coords = olEvt.target.getSource().getFeatures()[0].getGeometry().getCoordinates()[0];
      var A = this.map.getPixelFromCoordinate(coords[1]);
      var B = this.map.getPixelFromCoordinate(coords[4]);
      var C = this.map.getPixelFromCoordinate(coords[3]);
      var D = this.map.getPixelFromCoordinate(coords[2]);
      console.log(coords);
      console.log([A, D, C, B]);
      ctx.fillStyle = this.maskColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.lineTo(0, 0);
      ctx.closePath();
      ctx.moveTo(A[0], A[1]);
      ctx.lineTo(B[0], B[1]);
      ctx.lineTo(C[0], C[1]);
      ctx.lineTo(D[0], D[1]);
      ctx.lineTo(A[0], A[1]);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    /**
     * Initializes the print extent feature.
     *
     * @return {ol.Feature} The extent feature.
     */

  }, {
    key: "initPrintExtentFeature",
    value: function initPrintExtentFeature() {
      var printExtent = this.calculatePrintExtent();
      var extentFeature = new _Feature["default"]((0, _Polygon.fromExtent)(printExtent));
      var extentLayerSource = this.extentLayer.getSource();
      this._extentFeature = extentFeature;
      extentLayerSource.clear();
      extentLayerSource.addFeature(this._extentFeature);
      return this._extentFeature;
    }
    /**
     * Initializes the transform interaction.
     */

  }, {
    key: "initTransformInteraction",
    value: function initTransformInteraction() {
      if (_Shared["default"].getInteractionsByName(this.map, this.constructor.TRANSFORM_INTERACTION_NAME).length === 0) {
        var transform = new _InteractionTransform["default"](_objectSpread({
          features: [this._extentFeature],
          translateFeature: true,
          translate: true,
          stretch: false,
          scale: true,
          rotate: true,
          keepAspectRatio: true
        }, this.transformOpts));
        transform.set('name', this.constructor.TRANSFORM_INTERACTION_NAME);
        transform.on('scaling', this.onTransformScaling.bind(this));
        this.map.addInteraction(transform);
      }
    }
    /**
     * Called on translate interaction's `scaling` event.
     */

  }, {
    key: "onTransformScaling",
    value: function onTransformScaling() {
      var scale = this.getClosestScaleToFitExtentFeature();
      this.setScale(scale);
    }
    /**
     * Returns the closest scale to current print feature's extent.
     */

  }, {
    key: "getClosestScaleToFitExtentFeature",
    value: function getClosestScaleToFitExtentFeature() {
      var _this3 = this;

      var scales = this.getScales();

      var printFeatureExtent = this._extentFeature.getGeometry().getExtent();

      var printFeatureSize = (0, _extent.getSize)(printFeatureExtent);
      var closest = Number.POSITIVE_INFINITY;
      var fitScale = scales[0];
      scales.forEach(function (scale) {
        var scaleVal = scale.value ? scale.value : scale;

        var printScaleExtent = _this3.calculatePrintExtent(scaleVal);

        var printScaleSize = (0, _extent.getSize)(printScaleExtent);
        var diff = Math.abs(printScaleSize[0] - printFeatureSize[0]) + Math.abs(printScaleSize[1] - printFeatureSize[1]);

        if (diff < closest) {
          closest = diff;
          fitScale = scale;
        }
      });
      return fitScale;
    }
    /**
     * Returns the closest scale to fit the print feature's extent into the
     * current extent of the map.
     */

  }, {
    key: "getClosestScaleToFitMap",
    value: function getClosestScaleToFitMap() {
      var _this4 = this;

      var mapView = this.map.getView();
      var mapExtent = mapView.calculateExtent();
      var scales = this.getScales();
      var fitScale = scales[0];
      scales.forEach(function (scale) {
        var scaleVal = scale.value ? scale.value : scale;

        var printExtent = _this4.calculatePrintExtent(scaleVal);

        var contains = (0, _extent.containsExtent)(mapExtent, printExtent);

        if (contains) {
          fitScale = scale;
        }
      });
      return fitScale;
    }
    /**
     * Calculates the current rotation of the print extent feature.
     */

  }, {
    key: "calculateRotation",
    value: function calculateRotation() {
      var extentFeature = this._extentFeature;
      var coords = extentFeature.getGeometry().getCoordinates()[0];
      var p1 = coords[0];
      var p2 = coords[3];
      var rotation = Math.atan2(p2[1] - p1[1], p2[0] - p1[0]) * 180 / Math.PI;
      return -rotation;
    }
    /**
     * Resets the rotation of the print extent feature.
     */

  }, {
    key: "resetRotation",
    value: function resetRotation() {
      this.setRotation(this.calculateRotation() * -1);
    }
    /**
     * Rotates the print extent by the amount of the given rotation.
     *
     * @param {number} rotation The amount to rotate.
     */

  }, {
    key: "setRotation",
    value: function setRotation(rotation) {
      var center = (0, _extent.getCenter)(this._extentFeature.getGeometry().getExtent());

      this._extentFeature.getGeometry().rotate(rotation, center);
    }
    /**
     * Updates the geometry of the print extent feature to match the current scale.
     */

  }, {
    key: "updatePrintExtent",
    value: function updatePrintExtent() {
      if (this.isInitiated()) {
        var printExtent = this.calculatePrintExtent();

        if (this._extentFeature) {
          this._extentFeature.setGeometry((0, _Polygon.fromExtent)(printExtent));
        }
      }
    }
    /**
     * Calculates the extent based on a scale.
     *
     * @param {number} scale The scale to calculate the extent for. If not given,
     *                       the current scale of the provider will be used.
     *
     * @return {ol.Extent} The extent.
     */

  }, {
    key: "calculatePrintExtent",
    value: function calculatePrintExtent(scale) {
      var printMapSize = this.getPrintMapSize();
      var printScale = scale || this.getScale();

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
     * Computes size of print extent in pixel depending on dimensions of print map
     * and print scale.
     * @param {Object} printMapSize Print map size containing its width and height.
     * @param {number} printScale Print scale.
     *
     * @return {Object} Print extent size.
     */

  }, {
    key: "getPrintExtentSize",
    value: function getPrintExtentSize(printMapSize, printScale) {
      var mapUnits = this.map.getView().getProjection().getUnits();
      var inchesPerUnit = {
        'degrees': 4374754,
        'ft': 12,
        'm': 39.37
      };
      return {
        width: printMapSize.width / 72 / inchesPerUnit[mapUnits] * printScale,
        height: printMapSize.height / 72 / inchesPerUnit[mapUnits] * printScale
      };
    }
    /**
     * Opens the given URL in a new browser tab to download the given response
     * (if header are set correctly).
     *
     * @param {string} url The url to open.
     */

  }, {
    key: "download",
    value: function download(url) {
      if (/Opera|OPR\//.test(navigator.userAgent)) {
        window.open(url);
      } else {
        window.location.href = url;
      }
    }
    /**
     * Checks if a given layer should be printed.
     *
     * @param {ol.layer.Layer} layer The layer to check.
     *
     * @return {boolean} Whether the layer should be printed or not.
     */

  }, {
    key: "filterPrintableLayer",
    value: function filterPrintableLayer(layer) {
      return layer !== this.extentLayer && layer.getVisible() && this.layerFilter(layer);
    }
    /**
     * Checks if the legend of a given legend should be printed.
     *
     * @param {ol.layer.Layer} layer The layer to check.
     *
     * @return {boolean} Whether the legend of the layer should be printed or not.
     */

  }, {
    key: "filterPrintableLegend",
    value: function filterPrintableLegend(layer) {
      return layer !== this.extentLayer && layer.getVisible() && this.legendFilter(layer);
    }
    /**
     * Serializes/encodes the given layer.
     *
     * @param {ol.layer.Layer} layer The layer to serialize/encode.
     *
     * @return {Object} The serialized/encoded layer.
     */

  }, {
    key: "serializeLayer",
    value: function serializeLayer(layer) {
      var viewResolution = this.map.getView().getResolution();
      var layerSource = layer.getSource();
      var serializerCand = this.serializers.find(function (serializer) {
        return serializer.sourceCls.some(function (cls) {
          return layerSource.constructor.name === cls.name;
        });
      });

      if (serializerCand) {
        var serializer = new serializerCand();
        return serializer.serialize(layer, layer.get(this.CUSTOM_PRINT_SERIALIZER_OPTS_KEY), viewResolution);
      } else {
        _Logger["default"].info('No suitable serializer for this layer/source found. ' + 'Please check the input layer or provide an own serializer capabale ' + 'of serializing the given layer/source to the manager. Layer ' + 'candidate is: ', layer);
      }
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
      /*if(layer.get('legend')){
        return {
          name: layer.get('name'),
          icons: layer.get('legend')
        };
      }*/
      if (layer.getSource() instanceof _TileWMS["default"] || layer.getSource() instanceof _ImageWMS["default"]) {
        return {
          name: layer.get('name') || layer.getSource().getParams().LAYERS || '',
          icons: [layer.Style[0].LegendURL[0].OnlineResource]
          /*icons: [Shared.getLegendGraphicUrl(layer)]*/

        };
      }
    }
    /**
     * Returns the currently selected layout.
     *
     * @return {Object} The currently selected layout.
     */

  }, {
    key: "getLayout",
    value: function getLayout() {
      return this._layout;
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
      this.updatePrintExtent();
      this.dispatch('change:layout', layout);
    }
    /**
     * Returns the currently selected output format.
     *
     * @return {Object} The currently selected output format.
     */

  }, {
    key: "getOutputFormat",
    value: function getOutputFormat() {
      return this._outputFormat;
    }
    /**
     * Sets the output format to use.
     *
     * @param {string} name The name of the output format to use.
     */

  }, {
    key: "setOutputFormat",
    value: function setOutputFormat(name) {
      var format = this.getOutputFormats().find(function (format) {
        return format === name;
      });

      if (!format) {
        _Logger["default"].warn("No output format named '".concat(name, "' found."));

        return;
      }

      this._outputFormat = format;
      this.dispatch('change:outputformat', format);
    }
    /**
     * Returns the currently selected dpi.
     *
     * @return {Object} The currently selected dpi.
     */

  }, {
    key: "getDpi",
    value: function getDpi() {
      return this._dpi;
    }
    /**
     * Sets the dpi to use.
     *
     * @param {string} name The name of the dpi to use.
     */

  }, {
    key: "getScale",

    /**
     * Returns the currently selected scale.
     *
     * @return {Object} The currently selected scale.
     */
    value: function getScale() {
      return this._scale;
    }
    /**
     * Sets the scale to use. Updates the print extent accordingly.
     *
     * @param {number|string} value The value of the scale to use.
     */

  }, {
    key: "setScale",
    value: function setScale(value) {
      value = parseFloat(value);
      var scale = this.getScales().find(function (scale) {
        return scale === value;
      });

      if (!scale) {
        _Logger["default"].warn("No scale '".concat(value, "' found."));

        return;
      }

      this._scale = scale;
      this.updatePrintExtent();
      this.dispatch('change:scale', scale);
    }
    /**
     * Returns all supported layouts.
     *
     * @return {Array} The supported layouts.
     */

  }, {
    key: "getLayouts",
    value: function getLayouts() {
      return this._layouts;
    }
    /**
     * Returns all supported output formats.
     *
     * @return {Array} The supported output formats.
     */

  }, {
    key: "getOutputFormats",
    value: function getOutputFormats() {
      return this._outputFormats;
    }
    /**
     * Returns all supported dpis.
     *
     * @return {Array} The supported dpis.
     */

  }, {
    key: "getDpis",
    value: function getDpis() {
      return this._dpis;
    }
    /**
     * Returns all supported scales.
     *
     * @return {Array} The supported scales.
     */

  }, {
    key: "getScales",
    value: function getScales() {
      return this._scales;
    }
    /**
     * Returns print map size for chosen layout.
     *
     * @return {Object} The map.
     */

  }, {
    key: "getPrintMapSize",
    value: function getPrintMapSize() {
      return this._printMapSize;
    }
    /**
     * Sets the map size to use while printing.
     *
     * @param {Object} printMapSize The object containing width and height of
     * printed map.
     */

  }, {
    key: "setPrintMapSize",
    value: function setPrintMapSize(printMapSize) {
      this._printMapSize = printMapSize;
    }
    /**
     * Whether this manager has been initiated or not.
     *
     * @return {boolean} Whether this manager has been initiated or not.
     */

  }, {
    key: "isInitiated",
    value: function isInitiated() {
      return this._initiated;
    }
  }]);

  return BaseMapFishPrintManager;
}(_Observable2["default"]);

exports.BaseMapFishPrintManager = BaseMapFishPrintManager;

_defineProperty(BaseMapFishPrintManager, "EXTENT_LAYER_NAME", 'PrintManager Vector Layer');

_defineProperty(BaseMapFishPrintManager, "TRANSFORM_INTERACTION_NAME", 'PrintManager Transform Interaction');

_defineProperty(BaseMapFishPrintManager, "CUSTOM_PRINT_SERIALIZER_OPTS_KEY", 'customPrintSerializerOpts');

var _default = BaseMapFishPrintManager;
exports["default"] = _default;