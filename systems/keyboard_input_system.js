(function() {
  'use strict';

  Ecsys.Systems.KeyboardInputSystem = {
    componentTypes: ['KeyboardInput'],

    initialize: function() {
      this.keysDown = {};

      addEventListener('keydown', function(event) {
        this.keysDown[event.keyCode] = true;
      }.bind(this));

      addEventListener('keyup', function(event) {
        delete this.keysDown[event.keyCode];
      }.bind(this));
    },

    updateEntity: function(deltaTime, entity, components) {
      var keyboardInput = components[0];

      var inputHandlers = keyboardInput.inputHandlers || [Ecsys.InputHandlers.keyboardMovement];

      for (var i = 0; i < inputHandlers.length; i++) {
        inputHandlers[i](this, entity, keyboardInput, deltaTime);
      }
    }
  };
})();