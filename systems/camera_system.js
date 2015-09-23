(function() {
  'use strict';

  Ecsys.Systems.CameraSystem = {
    componentTypes: ['Position', 'Size', 'Camera'],

    drawEntity: function(deltaTime, cameraEntity, cameraComponents) {
      var context = this.game.getContext();

      var cameraPosition = cameraComponents[0];
      var cameraSize = cameraComponents[1];
      var camera = cameraComponents[2];

      var cameraOffset = this.game.getComponent(cameraEntity, 'Offset') || { x: 0, y: 0 };
      var cameraRotation = this.game.getComponent(cameraEntity, 'Rotation') || { angle: 0 };

      var cameraPos = { x: cameraPosition.x - cameraOffset.x, y: cameraPosition.y - cameraOffset.y };

      context.save();

      context.beginPath();
      context.rect(camera.canvasX, camera.canvasY, cameraSize.width, cameraSize.height);
      context.clip();

      context.translate(camera.canvasX - cameraPos.x, camera.canvasY - cameraPos.y);
      context.rotate(cameraRotation.angle);

      this.game.forEachEntity(function(e, entityComponents) {
        var entityPosition = entityComponents[0];
        var entitySize = entityComponents[1];
        var entityDrawable = entityComponents[2];

        var draw = true;

        if (entityDrawable.only && entityDrawable.only.indexOf(cameraEntity) == -1) {
          draw = false;
        }

        if (entityDrawable.except && entityDrawable.except.indexOf(cameraEntity) > -1) {
          draw = false;
        }

        if (draw) {
          var entityOffset = this.game.getComponent(e, 'Offset') || { x: 0, y: 0 };
          var entityScaling = this.game.getComponent(e, 'Scaling') || { x: 1, y: 1 };
          var entityRotation = this.game.getComponent(e, 'Rotation') || { angle: 0 };
          var entityTransparency = this.game.getComponent(e, 'Transparency') || { alpha: 1 };
          var entityText = this.game.getComponent(e, 'Text');
          var entityColor = this.game.getComponent(e, 'Color') || { color: 'black' };

          var entityPos = { x: entityPosition.x - entityOffset.x, y: entityPosition.y - entityOffset.y };

          if (!(entityPos.x + entitySize.width <= cameraPos.x || entityPos.x >= cameraPos.x + cameraSize.width || entityPos.y + entitySize.height <= cameraPos.y || entityPosition.y >= cameraPos.y + cameraSize.height)) {
            var sprite;
            var image;

            if ((sprite = this.game.getComponent(e, 'Sprite')) && sprite.source) {
              image = this.game.getImageCache().getImage(sprite.source);
            }

            context.save();

            context.globalAlpha = entityTransparency.alpha;
            context.translate(entityPosition.x, entityPosition.y);
            context.rotate(entityRotation.angle);
            context.scale(entityScaling.x, entityScaling.y);

            if (image) {
              var imagePosition = { x: sprite.x || 0, y: sprite.y || 0 };
              var imageSize = { width: sprite.width || entitySize.width, height: sprite.height || entitySize.height };

              context.drawImage(image, imagePosition.x, imagePosition.y, imageSize.width, imageSize.height, -entityOffset.x, -entityOffset.y, entitySize.width, entitySize.height);
            }
            else if (sprite) {
              context.fillRect(-entityOffset.x, -entityOffset.y, entitySize.width, entitySize.height);
            }

            if (entityText) {
              context.font = entityText.font || '48px sans-serif';
              context.textBaseline = entityText.baseline || 'hanging';
              context.fillStyle = entityColor.color;
              context.fillText(entityText.text, -entityOffset.x, -entityOffset.y, entitySize.width);
            }

            context.restore();
          }
        }
      }.bind(this), ['Position', 'Size', 'Drawable']);

      context.restore();

      context.strokeRect(camera.canvasX, camera.canvasY, cameraSize.width, cameraSize.height);
    }
  };
})();