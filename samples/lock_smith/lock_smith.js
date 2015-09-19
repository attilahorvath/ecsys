(function() {
  'use strict';

  window.LockSmith = {
    Systems: {},

    run: function() {
      var game = new Ecsys.Game({ hideCursor: true });

      game.systems.push(Ecsys.Systems.KeyboardInputSystem);
      game.systems.push(Ecsys.Systems.MouseInputSystem);
      game.systems.push(Ecsys.Systems.AnimationSystem);
      game.systems.push(Ecsys.Systems.ShakeSystem);
      game.systems.push(Ecsys.Systems.MovementSystem);
      game.systems.push(Ecsys.Systems.GlueSystem);
      game.systems.push(Ecsys.Systems.CollisionSystem);
      game.systems.push(Ecsys.Systems.CameraSystem);
      game.systems.push(Ecsys.Systems.LifetimeSystem);

      game.initialize();

      game.main();
    }
  };
})();