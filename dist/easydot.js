(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.easydot = factory());
}(this, function () { 'use strict';

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  /**
   * Wrapper function to implement `dot-string acccess` for target object
   *
   * @param {Object} target
   * @param {boolean} [safeOverJump=false] if true, over jump access allow
   * @return {Proxy} implemented object
   */
  var index = (function (target) {
    var safeOverJump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return new Proxy(target, {
      get: function get(target, property) {
        return _get(target, property, safeOverJump);
      },
      set: function set(target, property, value) {
        return _set(target, property, value, safeOverJump);
      }
    });

    function _get(target, property, safeOverJump) {
      var keys = property.split(".");
      var lastKey = keys.pop();
      var tmp = target;
      keys.forEach(function (key) {
        if (safeOverJump && _typeof(tmp) !== "object" || tmp === null) ; else {
          tmp = tmp[key];
        }
      });

      if (safeOverJump && !tmp) {
        return undefined;
      } else {
        return tmp[lastKey];
      }
    }

    function _set(target, property, value, safeOverJump) {
      var keys = property.split(".");
      var lastKey = keys.pop();
      var tmp = target;
      keys.forEach(function (key) {
        if (safeOverJump && typeof tmp[key] === "undefined" || tmp[key] === null) {
          tmp[key] = {};
        }

        tmp = tmp[key];
      });
      tmp[lastKey] = value;
      return true;
    }
  });

  return index;

}));
