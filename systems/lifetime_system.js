(function() {
  'use strict';

  Ecsys.Systems.LifetimeSystem = {
    componentTypes: ['Lifetime'],

    updateEntity: function(deltaTime, entity, components) {
      var lifetime = components[0];

      lifetime.timeout -= deltaTime;

      if (lifetime.timeout <= 0) {
        this.game.destroyEntity(entity);
      }
    }
  };
})();