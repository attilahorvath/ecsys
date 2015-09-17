(function() {
  'use strict';

  Ecsys.Systems.AnimationSystem = {
    componentTypes: ['Animations'],

    updateEntity: function(deltaTime, entity, components) {
      var animations = components[0];
      var expiredAnimations = [];

      for (var a = 0; a < animations.length; a++) {
        var animation = animations[a];
        if (animation) {
          var component = this.game.getComponent(entity, animation.component);

          if (typeof animation.currentTime == 'undefined') {
            animation.vectorValue = typeof animation.target == 'object';
            animation.currentTime = 0;

            if (animation.vectorValue) {
              animation.start = { x: component.x, y: component.y };
              animation.vector = Ecsys.Utils.subtractVector(component, animation.target);
            } else {
              animation.start = component[animation.property];
              animation.distance = animation.target - animation.start;
            }
          }

          if (animation.currentTime < animation.duration) {
            var easing = animation.easing || Ecsys.Easings.linear;
            var progress = easing(animation.currentTime / animation.duration);

            if (animation.vectorValue) {
              component.x = animation.start.x + progress * animation.vector.x;
              component.y = animation.start.y + progress * animation.vector.y;
            } else {
              component[animation.property] = animation.start + progress * animation.distance;
            }

            animation.currentTime += deltaTime;
          } else {
            if (animation.vectorValue) {
              component.x = animation.target.x;
              component.y = animation.target.y;
            } else {
              component[animation.property] = animation.target;
            }

            expiredAnimations.push(a);
          }
        }
      }

      for (var a = expiredAnimations.length - 1; a >= 0; a--) {
        delete animations[a];
      }
    }
  };
})();