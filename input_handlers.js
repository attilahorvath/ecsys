(function() {
  'use strict';

  Ecsys.InputHandlers = {
    pointer: function(mouseInputSystem, entity, mouseInput, deltaTime) {
      var position = mouseInputSystem.game.getComponent(entity, 'Position');
      var velocity = mouseInputSystem.game.getComponent(entity, 'Velocity') || mouseInputSystem.game.setComponent(entity, 'Velocity', { x: 0, y: 0 });

      var mouseVelocity = mouseInput.velocity || { x: 1, y: 1 };

      velocity.x = (mouseInputSystem.deltaPosition.x * mouseVelocity.x) / deltaTime;
      velocity.y = (mouseInputSystem.deltaPosition.y * mouseVelocity.y) / deltaTime;
    },

    keyboardMovement: function(keyboardInputSystem, entity, keyboardInput, deltaTime) {
      var position = keyboardInputSystem.game.getComponent(entity, 'Position');
      var velocity = keyboardInputSystem.game.getComponent(entity, 'Velocity') || keyboardInputSystem.game.setComponent(entity, 'Velocity', { x: 0, y: 0 });

      var vector = { x: 0, y: 0 };
      var keyboardVelocity = keyboardInput.velocity || { x: 1, y: 1 };

      var up = keyboardInput.bindings ? keyboardInput.bindings.up : 38;
      var down = keyboardInput.bindings ? keyboardInput.bindings.down : 40;
      var left = keyboardInput.bindings ? keyboardInput.bindings.left : 37;
      var right = keyboardInput.bindings ? keyboardInput.bindings.right : 39;

      if (up in keyboardInputSystem.keysDown && !(down in keyboardInputSystem.keysDown)) {
        vector.y = -keyboardVelocity.y;
      } else if (down in keyboardInputSystem.keysDown && !(up in keyboardInputSystem.keysDown)) {
        vector.y = keyboardVelocity.y;
      }

      if (left in keyboardInputSystem.keysDown && !(right in keyboardInputSystem.keysDown)) {
        vector.x = -keyboardVelocity.x;
      } else if (right in keyboardInputSystem.keysDown && !(left in keyboardInputSystem.keysDown)) {
        vector.x = keyboardVelocity.x;
      }

      var vector = Ecsys.Utils.multiplyVector(Ecsys.Utils.normalizeVector(vector), keyboardInput.speed);

      velocity.x = vector.x;
      velocity.y = vector.y;
    }
  };
})();