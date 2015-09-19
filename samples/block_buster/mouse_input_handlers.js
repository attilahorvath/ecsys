(function() {
  'use strict';

  BlockBuster.MouseInputHandlers = {
    paddle: function(mouseInputSystem, entity, mouseInput, deltaTime) {
      if (mouseInputSystem.justPressed.left) {
        mouseInputSystem.game.forEachEntity(function (entity, components) {
          mouseInputSystem.game.removeComponent(entity, 'Glue');
        }.bind(this), ['Ball', 'Glue']);
      }
    }
  }
})();