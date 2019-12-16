"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Observable = void 0;

var _ObservableEvent = _interopRequireDefault(require("./ObservableEvent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The Observable.
 */
var Observable =
/*#__PURE__*/
function () {
  function Observable() {
    _classCallCheck(this, Observable);

    _defineProperty(this, "events", {});
  }

  _createClass(Observable, [{
    key: "on",

    /**
    * Registers an event.
    *
    * @param {string} name The name of the event to register.
    * @param {Function} callback The callback function to register.
    */
    value: function on(name, callback) {
      var event = this.events[name];

      if (!event) {
        event = new _ObservableEvent["default"](name);
        this.events[name] = event;
      }

      event.registerCallback(callback);
    }
    /**
    * Unregisters an event.
    *
    * @param {string} name The name of the event to unregister.
    * @param {Function} callback The callback function to unregister.
    */

  }, {
    key: "un",
    value: function un(name, callback) {
      var event = this.events[name];

      if (event && event.callbacks.indexOf(callback) > -1) {
        event.unregisterCallback(callback);

        if (event.callbacks.length === 0) {
          delete this.events[name];
        }
      }
    }
    /**
     * Dispatches the given event with the provided data.
     *
     * @param {string} name The name of the event to dispatch.
     * @param {Object} data The data to apply to the event callback.
     */

  }, {
    key: "dispatch",
    value: function dispatch(name, data) {
      var event = this.events[name];

      if (event) {
        event.fire(data);
      }
    }
  }]);

  return Observable;
}();

exports.Observable = Observable;
var _default = Observable;
exports["default"] = _default;