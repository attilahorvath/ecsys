(function() {
  'use strict';

  Ecsys.Utils = {
    mergeObjects: function(a, b) {
      var merged = {};

      for (var attribute in a) {
        merged[attribute] = a[attribute];
      }

      for (var attribute in b) {
        merged[attribute] = b[attribute];
      }

      return merged;
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
    }
  };
})();