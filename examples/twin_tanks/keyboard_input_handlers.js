(function() {
  'use strict';

  TwinTanks.KeyboardInputHandlers = {
    fire: function(keyboardInputSystem, entity, keyboardInput, deltaTime) {
      var fire = (keyboardInput.bindings && keyboardInput.bindings.fire) ? keyboardInput.bindings.fire : 32;

      if (fire in keyboardInputSystem.keysDown) {
        var position = keyboardInputSystem.game.getComponent(entity, 'Position');
        var rotation = keyboardInputSystem.game.getComponent(entity, 'Rotation');

        keyboardInputSystem.game.createEntity([
          ['Position', { x: position.x, y: position.y }],
          ['Size', { width: 16, height: 16 }],
          ['Offset', { x: 8, y: 8 }],
          ['Velocity', { x: Math.cos(rotation.angle) * 0.5, y: Math.sin(rotation.angle) * 0.5, setRotation: true }],
          ['Sprite', { source: 'images/bullet.png' }]
        ]);
      }
    }
  };
})();