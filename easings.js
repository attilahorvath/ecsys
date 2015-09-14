(function() {
  'use strict';

  Ecsys.Easings = {
    linear: function(t) {
      return t;
    },

    easeInCubic: function(t) {
      return t * t * t;
    },

    easeOutElastic: function(t) {
      return Math.pow(2, -10 * t) * Math.sin((t - 0.075) * (2 * Math.PI) / 0.3) + 1;
    }
  };
})();