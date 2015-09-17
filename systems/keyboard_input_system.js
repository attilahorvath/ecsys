(function() {
  'use strict';

  Ecsys.Systems.KeyboardInputSystem = {
    preventDefault: true,
    componentTypes: ['KeyboardInput'],

    initialize: function() {
      this.keysDown = {};
      this.lastDown = {};
      this.justPressed = {};
      this.justReleased = {};

      addEventListener('keydown', function(event) {
        this.keysDown[event.keyCode] = true;

        if (this.preventDefault) {
          event.preventDefault();
        }
      }.bind(this));

      addEventListener('keyup', function(event) {
        delete this.keysDown[event.keyCode];

        if (this.preventDefault) {
          event.preventDefault();
        }
      }.bind(this));
    },

    update: function(deltaTime) {
      this.justPressed = {};
      this.justReleased = {};

      for (var keyCode in this.keysDown) {
        if (!this.lastDown[keyCode]) {
          this.justPressed[keyCode] = true;
        }
      }

      for (var keyCode in this.lastDown) {
        if (!this.keysDown[keyCode]) {
          this.justReleased[keyCode] = true;
        }
      }

      this.game.forEachEntity(function (entity, components) {
        var keyboardInput = components[0];

        var inputHandlers = keyboardInput.inputHandlers || [Ecsys.KeyboardInputHandlers.keyboardMovement];

        for (var i = 0; i < inputHandlers.length; i++) {
          inputHandlers[i](this, entity, keyboardInput, deltaTime);
        }
      }.bind(this), this.componentTypes);

      this.lastDown = Ecsys.Utils.clone(this.keysDown);
    }
  };
})();