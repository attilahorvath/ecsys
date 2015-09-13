(function() {
  'use strict';

  Ecsys.Game = function(canvasSelector) {
    this.canvasSelector = canvasSelector;
    this.canvas = document.querySelector(this.canvasSelector);
    this.canvas.width = 320;
    this.canvas.height = 240;
    this.context = this.canvas.getContext('2d');

    this.imageCache = new Ecsys.ImageCache();

    this.componentMasks = [];
    this.components = {};

    this.namedEntities = {};

    this.systems = [];
    this.timers = [];

    for (var i = 0; i < Ecsys.ComponentTypes.length; i++) {
      this.registerComponentType(Ecsys.ComponentTypes[i]);
    }

    this.lastTime = Date.now();
  };

  Ecsys.Game.componentMask = function(componentType) {
    return 1 << Ecsys.ComponentTypes.indexOf(componentType);
  };

  Ecsys.Game.prototype.getCanvas = function() {
    return this.canvas;
  };

  Ecsys.Game.prototype.getContext = function() {
    return this.context;
  };

  Ecsys.Game.prototype.getImageCache = function() {
    return this.imageCache;
  };

  Ecsys.Game.prototype.getEntityCount = function() {
    return this.componentMasks.length;
  };

  Ecsys.Game.prototype.getComponent = function(entity, componentType) {
    return this.components[componentType][entity];
  };

  Ecsys.Game.prototype.setComponent = function(entity, componentType, component, setTimeout, removeTimeout) {
    if (typeof setTimeout == 'undefined') {
      this.componentMasks[entity] |= Ecsys.Game.componentMask(componentType);

      return this.components[componentType][entity] = component;
    } else {
      this.addTimer(function() {
        this.setComponent(entity, componentType, component);
      }.bind(this), setTimeout);
    }

    if (typeof removeTimeout != 'undefined') {
      this.addTimer(function() {
        this.removeComponent(entity, componentType);
      }.bind(this), removeTimeout);
    }
  };

  Ecsys.Game.prototype.removeComponent = function(entity, componentType, removeTimeout) {
    if (typeof removeTimeout == 'undefined') {
      this.componentMasks[entity] &= ~Ecsys.Game.componentMask(componentType);

      delete this.components[componentType][entity];
    } else {
      this.addTimer(function() {
        this.removeComponent(entity, componentType);
      }.bind(this), removeTimeout);
    }
  };

  Ecsys.Game.prototype.hasComponents = function(entity) {
    for (var i = 1; i < arguments.length; i++) {
      if (!(this.componentMasks[entity] & Ecsys.Game.componentMask(arguments[i]))) {
        return false;
      }
    }

    return true;
  };

  Ecsys.Game.prototype.createEntity = function(name) {
    var entity = null;

    for (var i = 0; i < this.componentMasks.length; i++) {
      if (!this.componentMasks[i]) {
        entity = i;
      }
    }

    if (!entity) {
      entity = this.componentMasks.length;
    }

    this.namedEntities[name] = entity;

    return entity;
  };

  Ecsys.Game.prototype.getEntity = function(name) {
    return this.namedEntities[name];
  };

  Ecsys.Game.prototype.destroyEntity = function(entity) {
    delete this.componentMasks[entity];
    delete this.namedEntities[name];
  };

  Ecsys.Game.prototype.registerComponentType = function(componentType) {
    this.components[componentType] = [];
  };

  Ecsys.Game.prototype.addTimer = function(callback, timeout) {
    this.timers.push(new Ecsys.Timer(callback, timeout));
  };

  Ecsys.Game.prototype.initialize = function() {
    for (var i = 0; i < this.systems.length; i++) {
      this.systems[i].game = this;

      if (typeof this.systems[i].initialize != 'undefined') {
        this.systems[i].initialize();
      }
    }
  };

  Ecsys.Game.prototype.main = function() {
    var currentTime = Date.now();
    var deltaTime = currentTime - this.lastTime;

    this.canvas.width = this.canvas.width;

    for (var i = 0; i < this.timers.length; i++) {
      this.timers[i].update(deltaTime);
    }

    for (var i = 0; i < this.systems.length; i++) {
      if (typeof this.systems[i].update != 'undefined') {
        this.systems[i].update(deltaTime);
      }
    }

    for (var i = 0; i < this.systems.length; i++) {
      if (typeof this.systems[i].draw != 'undefined') {
        this.systems[i].draw(deltaTime);
      }
    }

    this.lastTime = currentTime;

    requestAnimationFrame(this.main.bind(this));
  };
})();