(function() {
  'use strict';

  Ecsys.Game = function(options) {
    this.options = Ecsys.Utils.merge(Ecsys.Game.defaultOptions, options);

    this.canvasSelector = this.options.canvasSelector;

    if (typeof this.canvasSelector == 'undefined') {
      this.canvasSelector = '#ecsys-game';
      this.canvas = document.createElement('canvas');
      this.canvas.id = 'ecsys-game';
      document.body.appendChild(this.canvas);
    } else {
      this.canvas = document.querySelectorAll(this.canvasSelector)[0];
    }

    this.canvas.width = this.options.width;
    this.canvas.height = this.options.height;

    if (this.options.hideCursor) {
      this.canvas.style.cursor = 'none';
    }

    this.context = this.canvas.getContext('2d');

    this.imageCache = new Ecsys.ImageCache();

    this.componentMasks = [];
    this.components = {};

    this.namedEntities = {};
    this.templates = {};

    this.deadEntities = [];

    this.systems = [];
    this.timers = [];

    for (var i = 0; i < Ecsys.componentTypes.length; i++) {
      this.registerComponentType(Ecsys.componentTypes[i]);
    }

    this.lastTime = Date.now();
  };

  Ecsys.Game.defaultOptions = {
    width: 320,
    height: 240
  };

  Ecsys.Game.componentMask = function(componentType) {
    return 1 << Ecsys.componentTypes.indexOf(componentType);
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

  Ecsys.Game.prototype.getComponents = function(entity, componentTypes) {
    var components = [];

    for (var i = 0; i < componentTypes.length; i++) {
      components[i] = this.components[componentTypes[i]][entity];
    }

    return components;
  };

  Ecsys.Game.prototype.setTemplate = function(template, components) {
    this.templates[template] = components;
  };

  Ecsys.Game.prototype.setComponent = function(entity, componentType, component, setTimeout, removeTimeout) {
    if (typeof setTimeout == 'undefined') {
      this.componentMasks[entity] |= Ecsys.Game.componentMask(componentType);
      return this.components[componentType][entity] = (component || {});
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

  Ecsys.Game.prototype.setComponents = function(entity, components, setTimeout, removeTimeout) {
    if (typeof setTimeout == 'undefined') {
      for (var i = 0; i < components.length; i++) {
        this.componentMasks[entity] |= Ecsys.Game.componentMask(components[i][0]);
        this.components[components[i][0]][entity] = components[i][1] || {};
      }
    } else {
      this.addTimer(function() {
        this.setComponents(entity, components);
      }.bind(this), setTimeout);
    }

    if (typeof removeTimeout != 'undefined') {
      this.addTimer(function() {
        var componentTypes = [];

        for (var i = 0; i < components.length; i++) {
          componentTypes.push(components[0]);
        }

        this.removeComponents(entity, componentTypes);
      }.bind(this), removeTimeout);
    }

    return entity;
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

  Ecsys.Game.prototype.removeComponents = function(entity, componentTypes, removeTimeout) {
    if (typeof removeTimeout == 'undefined') {
      for (var i = 0; i < componentTypes.length; i++) {
        this.componentMasks[entity] &= ~Ecsys.Game.componentMask(componentTypes[i]);
        delete this.components[componentTypes[i]][entity];
      }
    } else {
      this.addTimer(function() {
        this.removeComponents(entity, componentTypes);
      }.bind(this), removeTimeout);
    }
  };

  Ecsys.Game.prototype.hasComponent = function(entity, component) {
    return (this.componentMasks[entity] & Ecsys.Game.componentMask(component)) == Ecsys.Game.componentMask(component);
  };

  Ecsys.Game.prototype.hasComponents = function(entity, components) {
    var mask = 0;

    for (var i = 0; i < components.length; i++) {
      mask |= Ecsys.Game.componentMask(components[i]);
    }

    return (this.componentMasks[entity] & mask) == mask;
  };

  Ecsys.Game.prototype.createEntity = function(components, name) {
    var entity = null;

    for (var i = 0; i < this.componentMasks.length; i++) {
      if (!this.componentMasks[i]) {
        entity = i;
      }
    }

    if (!entity) {
      entity = this.componentMasks.length;
    }

    if (typeof components != 'undefined') {
      this.setComponents(entity, components);
    }

    if (typeof name != 'undefined') {
      this.namedEntities[name] = entity;
    }

    return entity;
  };

  Ecsys.Game.prototype.createEntityFromTemplate = function(template, components, name) {
    var entityTemplate = this.templates[template];
    var templateComponents = [];

    for (var i = 0; i < entityTemplate.length; i++) {
      templateComponents.push([entityTemplate[i][0], Ecsys.Utils.clone(entityTemplate[i][1])]);
    }

    var entity = this.createEntity(templateComponents, name);

    if (typeof components != 'undefined') {
      this.setComponents(entity, components);
    }

    return entity;
  };

  Ecsys.Game.prototype.getEntity = function(name) {
    return this.namedEntities[name];
  };

  Ecsys.Game.prototype.destroyEntity = function(entity) {
    this.deadEntities.push(entity);
  };

  Ecsys.Game.prototype.forEachEntity = function(callback, componentTypes) {
    componentTypes = componentTypes || [];

    for (var i = 0; i < this.getEntityCount(); i++) {
      if (this.hasComponents(i, componentTypes)) {
        callback(i, this.getComponents(i, componentTypes));
      }
    }
  };

  Ecsys.Game.prototype.registerComponentType = function(componentType) {
    this.components[componentType] = [];
  };

  Ecsys.Game.prototype.addTimer = function(callback, timeout, repeat) {
    this.timers.push(new Ecsys.Timer(callback, timeout, repeat));
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

    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (var i = 0; i < this.timers.length; i++) {
      this.timers[i].update(deltaTime);
    }

    for (var i = 0; i < this.systems.length; i++) {
      if (typeof this.systems[i].update != 'undefined') {
        this.systems[i].update(deltaTime);
      }

      if (typeof this.systems[i].updateEntity != 'undefined') {
        this.forEachEntity(function(entity, components) {
          this.systems[i].updateEntity(deltaTime, entity, components);
        }.bind(this), this.systems[i].componentTypes);
      }
    }

    for (var i = 0; i < this.systems.length; i++) {
      if (typeof this.systems[i].draw != 'undefined') {
        this.systems[i].draw(deltaTime);
      }

      if (typeof this.systems[i].drawEntity != 'undefined') {
        this.forEachEntity(function(entity, components) {
          this.systems[i].drawEntity(deltaTime, entity, components);
        }.bind(this), this.systems[i].componentTypes);
      }
    }

    for (var e = 0; e < this.deadEntities.length; e++) {
      var entity = this.deadEntities[e];

      delete this.componentMasks[entity];

      for (var i = 0; i < Ecsys.componentTypes.length; i++) {
        delete this.components[Ecsys.componentTypes[i]][entity];
      }

      for (var name in this.namedEntities) {
        if (this.namedEntities[name] == entity) {
          delete this.namedEntities[entity];
        }
      }
    }

    this.deadEntities = [];

    this.lastTime = currentTime;

    requestAnimationFrame(this.main.bind(this));
  };
})();