(function() {
  'use strict';

  Ecsys.Systems.RotationSystem = {
    componentTypes: ['AngularVelocity'],

    updateEntity: function(deltaTime, entity, components) {
      var angularVelocity = components[0];
      var rotation = this.game.getComponent(entity, 'Rotation') || this.game.setComponent(entity, 'Rotation', { angle: 0 });

      rotation.angle += angularVelocity.velocity * deltaTime;
      rotation.angle = Ecsys.Utils.normalizeAngle(rotation.angle);
    }
  };
})();