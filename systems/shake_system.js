(function() {
  'use strict';

  Ecsys.Systems.ShakeSystem = {
    update: function(deltaTime) {
      for (var i = 0; i < this.game.getEntityCount(); i++) {
        if (this.game.hasComponents(i, 'Shake')) {
          var offset = this.game.getComponent(i, 'Offset') || this.game.setComponent(i, 'Offset', { x: 0, y: 0 });
          var shake = this.game.getComponent(i, 'Shake');

          offset.x = -(shake.intensity / 2) + Math.random() * shake.intensity;
          offset.y = -(shake.intensity / 2) + Math.random() * shake.intensity;
        }
      }
    }
  };
})();