(function() {
  'use strict';

  LockSmith.Systems.DialSystem = {
    componentTypes: ['Dial'],

    updateEntity: function(deltaTime, entity, components) {
      var dial = components[0];

      if (!dial.level) {
        dial.level = 1;
      }

      if (!dial.progress) {
        dial.progress = dial.level;
      }

      if (dial.action) {
        var bodyEntity = this.game.getEntity('Body');

        var rotation = this.game.getComponent(entity, 'Rotation') || { angle: 0 };
        var bodyRotation = this.game.getComponent(bodyEntity, 'Rotation') || { angle: 0 };

        var angleDifference = Ecsys.Utils.normalizeAngle(bodyRotation.angle - rotation.angle);

        if (!this.game.hasComponent(entity, 'AngularVelocity')) {
          var shackleEntity = this.game.getEntity('Shackle');

          this.game.setComponent(shackleEntity, 'Position', { x: 160, y: 70 });
          this.game.removeComponent(shackleEntity, 'Animations');

          if (angleDifference < 0) {
            this.game.setComponent(entity, 'AngularVelocity', { velocity: -0.002 });
          } else {
            this.game.setComponent(entity, 'AngularVelocity', { velocity: 0.002 });
          }
        } else {
          var bodyBody = this.game.getComponent(bodyEntity, 'Body');

          var progressEntity = this.game.getEntity('Progress');
          var progressText = this.game.getComponent(progressEntity, 'Text');

          if (Math.abs(angleDifference) < 0.1) {
            dial.progress -= 1;

            if (dial.progress == 0) {
              dial.level += 1;
              dial.progress = dial.level;

              this.game.removeComponent(entity, 'AngularVelocity');
              this.game.removeComponent(entity, 'Rotation');

              var levelEntity = this.game.getEntity('Level');
              var levelText = this.game.getComponent(levelEntity, 'Text');

              levelText.text = 'Level ' + dial.level;

              var shackleEntity = this.game.getEntity('Shackle');

              this.game.setComponent(shackleEntity, 'Animations', [{ component: 'Position', target: { x: 160, y: 20 }, duration: 1000, easing: Ecsys.Easings.easeOutElastic }]);

              var backgroundEntity = this.game.getEntity('Background');
              var backgroundHue = this.game.getComponent(backgroundEntity, 'Color').hue;

              this.game.setComponent(backgroundEntity, 'Animations', [{ component: 'Color', property: 'hue', target: backgroundHue + 30 + Math.random() * 90, duration: 1000 }]);
            }
          } else {
            var cameraEntity = this.game.getEntity('Camera');
            this.game.setComponent(cameraEntity, 'Shake', { intensity: 2 }, 0, 400);

            this.game.removeComponent(entity, 'AngularVelocity');
            this.game.removeComponent(entity, 'Rotation');

            dial.progress = dial.level;
          }

          progressText.text = dial.progress;

          bodyBody.trigger = true;
        }

        dial.action = false;
      }
    }
  };
})();