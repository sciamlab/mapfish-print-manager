"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BaseSerializer = void 0;

var _Shared = _interopRequireDefault(require("../util/Shared"));

var _Logger = _interopRequireDefault(require("../util/Logger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The BaseSerializer.
 *
 * @class
 */
var BaseSerializer =
/*#__PURE__*/
function () {
  function BaseSerializer() {
    var _this = this;

    _classCallCheck(this, BaseSerializer);

    _defineProperty(this, "validateSource", function (source) {
      var isValidSource = _this.constructor.sourceCls.some(function (cls) {
        return source instanceof cls;
      });

      if (!isValidSource) {
        _Logger["default"].warn('Cannot serialize the given source with this serializer');
      }

      return isValidSource;
    });
  }

  _createClass(BaseSerializer, [{
    key: "serialize",

    /**
     * Serializes/Encodes the given layer.
     *
     * @param {ol.layer.Layer} layer The layer to serialize/encode.
     * @return {Object} The serialized/encoded layer.
     */
    value: function serialize(layer) {
      var serialized = {};
      var source = layer.getSource();
      var units = source.getProjection() ? source.getProjection().getUnits() : 'm';

      if (layer.getMinResolution() > 0) {
        serialized.minScaleDenominator = _Shared["default"].getScaleForResolution(layer.getMinResolution(), units);
      }

      if (layer.getMaxResolution() !== Infinity) {
        serialized.maxScaleDenominator = _Shared["default"].getScaleForResolution(layer.getMaxResolution(), units);
      }

      return serialized;
    }
    /**
     * Validates if the given ol source is compatible with the serializer. Usally
     * called by subclasses.
     *
     * @param {ol.source.Source} source The source to validate.
     * @return {boolean} Whether it is a valid source or not.
     */

  }]);

  return BaseSerializer;
}();

exports.BaseSerializer = BaseSerializer;

_defineProperty(BaseSerializer, "sourceCls", []);

var _default = BaseSerializer;
exports["default"] = _default;