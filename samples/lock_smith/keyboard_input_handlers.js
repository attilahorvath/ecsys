(function() {
  'use strict';

  LockSmith.KeyboardInputHandlers = {
    dial: function(keyboardInputSystem, entity, keyboardInput, deltaTime) {
      if (keyboardInputSystem.justPressed[32]) {
        var dial = keyboardInputSystem.game.getComponent(entity, 'Dial');
        dial.action = true;
      }
    }
  };
})();