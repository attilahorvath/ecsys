(function() {
  'use strict';

  Ecsys.ImageCache = function() {
    this.images = {};
  };

  Ecsys.ImageCache.prototype.getImage = function(source) {
    if (this.images[source]) {
      return this.images[source].loaded ? this.images[source].image : null;
    } else {
      var img = new Image();

      img.addEventListener('load', function() {
        this.images[source].loaded = true;
      }.bind(this), false);

      this.images[source] = { image: img, loaded: false };

      img.src = source;

      return this.getImage(source);
    }
  };
})();