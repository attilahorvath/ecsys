(function() {
  'use strict';

  Ecsys.Easings = {
    linear: function(currentTime, duration) {
      return currentTime / duration;
    },

    easeInCubic: function(currentTime, duration) {
      return Math.pow(currentTime / duration, 3);
    },

    easeOutElastic: function(currentTime, duration) {
      return Math.pow(2, -10 * (currentTime / duration)) * Math.sin(((currentTime / duration) - 0.075) * (2 * Math.PI) / 0.3) + 1;
    }
  };
})();