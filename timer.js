(function() {
  'use strict';

  Ecsys.Timer = function(callback, timeout) {
    this.callback = callback;
    this.timeout = timeout;
    this.active = true;
  };

  Ecsys.Timer.prototype.isActive = function() {
    return this.active;
  };

  Ecsys.Timer.prototype.update = function(deltaTime) {
    this.timeout -= deltaTime;

    if (this.timeout <= 0 && this.active) {
      this.callback();
      this.active = false;
    }
  };
})();