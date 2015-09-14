(function() {
  'use strict';

  Ecsys.Systems.CollisionSystem = {
    componentTypes: ['Position', 'Size', 'Collidable'],

    update: function(deltaTime) {
      var collisions = [];

      this.game.forEachEntity(function(a, aComponents) {
        var aPosition = aComponents[0];
        var aSize = aComponents[1];
        var aOffset = this.game.getComponent(a, 'Offset') || { x: 0, y: 0 };

        var aPos = { x: aPosition.x - aOffset.x, y: aPosition.y - aOffset.y };

        this.game.forEachEntity(function(b, bComponents) {
          var bPosition = bComponents[0];
          var bSize = bComponents[1];
          var bOffset = this.game.getComponent(b, 'Offset') || { x: 0, y: 0 };

          var bPos = { x: bPosition.x - bOffset.x, y: bPosition.y - bOffset.y };

          if (!(aPos.x + aSize.width <= bPos.x || aPos.x >= bPos.x + bSize.width || aPos.y + aSize.height <= bPos.y || aPos.y >= bPos.y + bSize.height)) {
            collisions.push([a, b]);
          }
        }.bind(this), this.componentTypes);
      }.bind(this), this.componentTypes);
    }
  };
})();