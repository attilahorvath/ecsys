(function() {
  'use strict';

  Ecsys.Systems.UISystem = {
    componentTypes: ['UI'],

    drawEntity: function(deltaTime, entity, components) {
      var context = this.game.getContext();

      var position = this.game.getComponent(entity, 'Position') || { x: 0, y: 0};
      var sprite = this.game.getComponent(entity, 'Sprite');
      var text = this.game.getComponent(entity, 'Text');

      context.font = '48px serif';
      context.textBaseline = 'hanging';
      context.fillRect(0, 0, 10, 10);
      context.fillText('Hi', 10, 10);

      // TODO

      var entityPosition = this.game.getComponent(e, 'Position');
      var entitySize = this.game.getComponent(e, 'Size');
      var entityOffset = this.game.getComponent(e, 'Offset') || { x: 0, y: 0 };
      var entityScaling = this.game.getComponent(e, 'Scaling') || { x: 1, y: 1 };
      var entityRotation = this.game.getComponent(e, 'Rotation') || { angle: 0 };
      var entityTransparency = this.game.getComponent(e, 'Transparency') || { alpha: 1 };

      var entityPos = { x: entityPosition.x - entityOffset.x, y: entityPosition.y - entityOffset.y };

      if (!(entityPos.x + entitySize.width <= cameraPos.x || entityPos.x >= cameraPos.x + cameraSize.width || entityPos.y + entitySize.height <= cameraPos.y || entityPosition.y >= cameraPos.y + cameraSize.height)) {
        var sprite;
        var image;

        if (sprite = this.game.getComponent(e, 'Sprite')) {
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
        else {
          context.fillRect(-entityOffset.x, -entityOffset.y, entitySize.width, entitySize.height);
        }

        context.restore();
    }
  };
})();