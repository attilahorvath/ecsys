(function() {
  'use strict';

  Ecsys.Systems.MovementSystem = {
    update: function(deltaTime) {
      for (var i = 0; i < this.game.getEntityCount(); i++) {
        if (this.game.hasComponents(i, 'Position', 'Velocity')) {
          var position = this.game.getComponent(i, 'Position');
          var velocity = this.game.getComponent(i, 'Velocity');
          var constraints = this.game.getComponent(i, 'Constraints');

          position.x += velocity.x * deltaTime;
          position.y += velocity.y * deltaTime;

          if (constraints) {
            var offset = this.game.getComponent(i, 'Offset') || { x: 0, y: 0 };
            var pos = { x: position.x - offset.x, y: position.y - offset.y };

            if (pos.x < constraints.minimum.x) {
              position.x = constraints.minimum.x + offset.x;
            }
            if (pos.y < constraints.minimum.y) {
              position.y = constraints.minimum.y + offset.y;
            }
            if (pos.x > constraints.maximum.x) {
              position.x = constraints.maximum.x + offset.x;
            }
            if (pos.y > constraints.maximum.y) {
              position.y = constraints.maximum.y + offset.y;
            }
          }
        }
      }
    }
  };
})();