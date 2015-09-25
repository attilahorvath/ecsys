(function() {
  'use strict';

  Ecsys.Utils = {
    merge: function(a, b) {
      var merged = {};

      for (var attribute in a) {
        merged[attribute] = a[attribute];
      }

      for (var attribute in b) {
        merged[attribute] = b[attribute];
      }

      return merged;
    },

    clone: function(object) {
      if (typeof object == 'object') {
        if (Array.isArray(object)) {
          var clone = [];

          for (var i = 0; i < object.length; i++) {
            clone.push(Ecsys.Utils.clone(object[i]));
          }

          return clone;
        } else {
          var clone = {};

          for (var attribute in object) {
            clone[attribute] = Ecsys.Utils.clone(object[attribute]);
          }

          return clone;
        }
      } else {
        return object;
      }
    },

    measureVector: function(vector) {
      return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    },

    normalizeVector: function(vector) {
      var length = Ecsys.Utils.measureVector(vector);

      return length == 0 ? { x: 0, y: 0 } : { x: vector.x / length, y: vector.y / length };
    },

    multiplyVector: function(vector, scalar) {
      return { x: vector.x * scalar, y: vector.y * scalar };
    },

    subtractVector: function(a, b) {
      return { x: b.x - a.x, y: b.y - a.y };
    },

    calculateDistance: function(from, to) {
      return Math.sqrt((to.x - from.x) * (to.x - from.x) + (to.y - from.y) * (to.y - from.y));
    },

    normalizeAngle: function(angle) {
      while (angle < -Math.PI) {
        angle += Math.PI * 2;
      }

      while (angle > Math.PI) {
        angle -= Math.PI * 2;
      }

      return angle;
    },

    parseColorValue: function(color) {
      var alpha = typeof color.alpha != 'undefined' ? color.alpha : 1;

      if (typeof color.red != 'undefined' && typeof color.green != 'undefined' && typeof color.blue != 'undefined') {
        return 'rgba(' + color.red + ',' + color.green + ',' + color.blue + ',' + alpha + ')';
      } else if (typeof color.hue != 'undefined' && typeof color.saturation != 'undefined' && typeof color.lightness != 'undefined') {
        return 'hsla(' + color.hue + ',' + color.saturation + ',' + color.lightness + ',' + alpha + ')';
      }
    }
  };
})();