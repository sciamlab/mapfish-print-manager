"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ObservableEvent = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * The ObservableEvent.
 */
var ObservableEvent =
/*#__PURE__*/
function () {
  /**
   * The name of the event.
   *
   * @type {string}
   */

  /**
   * The callback functions of the event.
   *
   * @type {Array}
   */

  /**
   * The constructor.
   */
  function ObservableEvent(eventName) {
    _classCallCheck(this, ObservableEvent);

    _defineProperty(this, "eventName", '');

    _defineProperty(this, "callbacks", []);

    this.eventName = eventName;
  }
  /**
   * Registers a callback to this ObservableEvent.
   *
   * @param {Function} callback The callback function to register.
   */


  _createClass(ObservableEvent, [{
    key: "registerCallback",
    value: function registerCallback(callback) {
      this.callbacks.push(callback);
    }
    /**
     * Unregisters a callback of this ObservableEvent.
     *
     * @param {Function} callback The callback to unregister.
     */

  }, {
    key: "unregisterCallback",
    value: function unregisterCallback(callback) {
      var index = this.callbacks.indexOf(callback);

      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    }
    /**
     * Calls all given callbacks of the event with the provided data.
     *
     * @param {Object} data The data to call the callback(s) with.
     */

  }, {
    key: "fire",
    value: function fire(data) {
      var callbacks = this.callbacks.slice(0);
      callbacks.forEach(function (callback) {
        callback(data);
      });
    }
  }]);

  return ObservableEvent;
}();

exports.ObservableEvent = ObservableEvent;
var _default = ObservableEvent;
exports["default"] = _default;