(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.easydot = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  /**
   * Wrapper function to implement `dot-string acccess` for target object
   *
   * @param {Object} implements target
   * @param {boolean} [safeOverJump=false] if true, over jump access
   * @return {Proxy} implemented object
   */
  var easydot = (function (target) {
    var safeOverJump = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    return new Proxy(target, {
      get: function get(target, property) {
        return _get(target, property, safeOverJump);
      },
      set: function set(target, property, value) {
        _set(target, property, value, safeOverJump);
      }
    });

    function _get(target, property, safeOverJump) {
      var keys = property.split(".");
      var lastKey = keys.pop();
      var tmp = target;
      keys.forEach(function (key) {
        if (safeOverJump && _typeof(tmp) !== "object" || tmp === null) {
          return undefined;
        }

        tmp = tmp[key];
      });
      return tmp[lastKey];
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
    }
  });

  return easydot;

}));
