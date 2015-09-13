(function() {
  'use strict';

  Ecsys.Systems.GlueSystem = {
    update: function(deltaTime) {
      for (var i = 0; i < this.game.getEntityCount(); i++) {
        if (this.game.hasComponents(i, 'Glue')) {
          var glue = this.game.getComponent(i, 'Glue');
          var targetPosition = this.game.getComponent(glue.target, 'Position');
          var offset = glue.offset || { x: 0, y: 0 };

          this.game.setComponent(i, 'Position', { x: targetPosition.x + offset.x, y: targetPosition.y + offset.y });
        }
      }
    }
  };
})();