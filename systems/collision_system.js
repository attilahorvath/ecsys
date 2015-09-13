(function() {
  'use strict';

  Ecsys.Systems.CollisionSystem = {
    update: function(deltaTime) {
      var collisions = [];

      for (var a = 0; a < this.game.getEntityCount(); a++) {
        if (this.game.hasComponents(a, 'Position', 'Size', 'RigidBody')) {
          var aPosition = this.game.getComponent(a, 'Position');
          var aSize = this.game.getComponent(a, 'Size');
          var aOffset = this.game.getComponent(a, 'Offset') || { x: 0, y: 0 };

          var aPos = { x: aPosition.x - aOffset.x, y: aPosition.y - aOffset.y };

          for (var b = a + 1; b < this.game.getEntityCount(); b++) {
            if (this.game.hasComponents(b, 'Position', 'Size', 'RigidBody')) {
              var bPosition = this.game.getComponent(b, 'Position');
              var bSize = this.game.getComponent(b, 'Size');
              var bOffset = this.game.getComponent(b, 'Offset') || { x: 0, y: 0 };

              var bPos = { x: bPosition.x - bOffset.x, y: bPosition.y - bOffset.y };

              if (!(aPos.x + aSize.width <= bPos.x || aPos.x >= bPos.x + bSize.width || aPos.y + aSize.height <= bPos.y || aPos.y >= bPos.y + bSize.height)) {
                collisions.push([a, b]);
              }
            }
          }
        }
      }
    }
  };
})();