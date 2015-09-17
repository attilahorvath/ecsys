(function() {
  'use strict';

  Ecsys.Timer = function(callback, timeout, repeat) {
    this.callback = callback;
    this.timeout = timeout;
    this.repeat = repeat;

    this.originalTimeout = timeout;
    this.active = true;
  };

  Ecsys.Timer.prototype.isActive = function() {
    return this.active;
  };

  Ecsys.Timer.prototype.update = function(deltaTime) {
    this.timeout -= deltaTime;

    if (this.timeout <= 0 && this.active) {
      this.callback();

      if (this.repeat) {
        this.timeout = this.originalTimeout;
      } else {
        this.active = false;
      }
    }
  };
})();