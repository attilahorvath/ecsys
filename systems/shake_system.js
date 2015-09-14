(function() {
  'use strict';

  Ecsys.Systems.ShakeSystem = {
    componentTypes: ['Shake'],

    updateEntity: function(deltaTime, entity, components) {
      var shake = components[0];
      var offset = this.game.getComponent(entity, 'Offset') || this.game.setComponent(entity, 'Offset', { x: 0, y: 0 });

      offset.x = -(shake.intensity / 2) + Math.random() * shake.intensity;
      offset.y = -(shake.intensity / 2) + Math.random() * shake.intensity;
    }
  };
})();