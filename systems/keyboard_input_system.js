(function() {
  'use strict';

  Ecsys.Systems.KeyboardInputSystem = {
    initialize: function() {
      this.keysDown = {};

      addEventListener('keydown', function(event) {
        this.keysDown[event.keyCode] = true;
      }.bind(this));

      addEventListener('keyup', function(event) {
        delete this.keysDown[event.keyCode];
      }.bind(this));
    },

    update: function(deltaTime) {
      for (var i = 0; i < this.game.getEntityCount(); i++) {
        if (this.game.hasComponents(i, 'Position', 'KeyboardInput')) {
          var position = this.game.getComponent(i, 'Position');
          var keyboardInput = this.game.getComponent(i, 'KeyboardInput');
          var velocity = this.game.getComponent(i, 'Velocity') || this.game.setComponent(i, 'Velocity', { x: 0, y: 0 });

          var vector = { x: 0, y: 0 };
          var keyboardVelocity = keyboardInput.velocity || { x: 1, y: 1 };

          if (38 in this.keysDown && !(40 in this.keysDown)) {
            vector.y = -keyboardVelocity.y;
          } else if (40 in this.keysDown && !(38 in this.keysDown)) {
            vector.y = keyboardVelocity.y;
          }

          if (37 in this.keysDown && !(39 in this.keysDown)) {
            vector.x = -keyboardVelocity.x;
          } else if (39 in this.keysDown && !(37 in this.keysDown)) {
            vector.x = keyboardVelocity.x;
          }

          var vector = Ecsys.Utils.multiplyVector(Ecsys.Utils.normalizeVector(vector), keyboardInput.speed);

          velocity.x = vector.x;
          velocity.y = vector.y;
        }
      }
    }
  };
})();