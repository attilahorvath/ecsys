(function() {
  'use strict';

  Ecsys.Systems.KeyboardInputSystem = {
    preventDefault: true,
    componentTypes: ['KeyboardInput'],

    initialize: function() {
      this.keysDown = {};

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

    updateEntity: function(deltaTime, entity, components) {
      var keyboardInput = components[0];

      var inputHandlers = keyboardInput.inputHandlers || [Ecsys.KeyboardInputHandlers.keyboardMovement];

      for (var i = 0; i < inputHandlers.length; i++) {
        inputHandlers[i](this, entity, keyboardInput, deltaTime);
      }
    }
  };
})();