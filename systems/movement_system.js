(function() {
  'use strict';

  Ecsys.Systems.MovementSystem = {
    componentTypes: ['Position', 'Velocity'],

    updateEntity: function(deltaTime, entity, components) {
      var position = components[0];
      var velocity = components[1];
      var constraints = this.game.getComponent(entity, 'Constraints');

      position.x += velocity.x * deltaTime;
      position.y += velocity.y * deltaTime;

      if (constraints) {
        var offset = this.game.getComponent(entity, 'Offset') || { x: 0, y: 0 };
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
  };
})();