(function() {
  'use strict';

  LockSmith.Systems.BodySystem = {
    componentTypes: ['Body'],

    updateEntity: function(deltaTime, entity, components) {
      var body = components[0];

      if (body.trigger || !this.game.hasComponent(entity, 'Rotation')) {
        var dialEntity = this.game.getEntity('Dial');
        var dialRotation = this.game.getComponent(dialEntity, 'Rotation') || { angle: 0 };
        var dialAngularVelocity = this.game.getComponent(dialEntity, 'AngularVelocity') || { velocity: Math.random() > 0.5 ? 0.002 : -0.002 };

        var angle = dialRotation.angle + (0.7 + Math.random() * (Math.PI - 0.5)) * (dialAngularVelocity.velocity < 0 ? 1 : -1);
        angle = Ecsys.Utils.normalizeAngle(angle);

        dialAngularVelocity.velocity = -dialAngularVelocity.velocity;

        this.game.setComponent(entity, 'Rotation', { angle: angle });

        body.trigger = false;
      }
    }
  };
})();