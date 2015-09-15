(function() {
  'use strict';

  Ecsys.MouseInputHandlers = {
    pointer: function(mouseInputSystem, entity, mouseInput, deltaTime) {
      var position = mouseInputSystem.game.getComponent(entity, 'Position');
      var velocity = mouseInputSystem.game.getComponent(entity, 'Velocity') || mouseInputSystem.game.setComponent(entity, 'Velocity', { x: 0, y: 0 });

      var mouseVelocity = mouseInput.velocity || { x: 1, y: 1 };

      velocity.x = (mouseInputSystem.deltaPosition.x * mouseVelocity.x) / deltaTime;
      velocity.y = (mouseInputSystem.deltaPosition.y * mouseVelocity.y) / deltaTime;
    }
  };
})();