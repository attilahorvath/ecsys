(function() {
  'use strict';

  Ecsys.Systems.GlueSystem = {
    componentTypes: ['Glue'],

    updateEntity: function(deltaTime, entity, components) {
      var glue = components[0];
      var targetPosition = this.game.getComponent(glue.target, 'Position');
      var offset = glue.offset || { x: 0, y: 0 };

      this.game.setComponent(entity, 'Position', { x: targetPosition.x + offset.x, y: targetPosition.y + offset.y });
    }
  };
})();