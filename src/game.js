'use strict';

import { getCurrentTime, requestNextFrame } from './utils';

class Game {
  constructor() {
    this.systems = [];
    this.entities = new Map();
    this.lastTime = getCurrentTime();
  }

  addSystem(system) {
    system.game = this;
    this.systems.push(system);

    return this;
  }

  addEntity(entity) {
    this.entities.set(entity.id, entity);

    return this;
  }

  getEntity(id) {
    return this.entities.get(id);
  }

  removeEntity(id) {
    this.entities.delete(id);

    return this;
  }

  forEachEntity(callback) {
    for (let entity of this.entities.values()) {
      callback(entity);
    }
  }

  run() {
    let currentTime = getCurrentTime();
    let deltaTime = currentTime - this.lastTime;

    for (let system of this.systems) {
      system.update(deltaTime);
    }

    this.lastTime = currentTime;

    for (let entity of this.entities.values()) {
      console.log(entity.components.position);
    }

    requestNextFrame(() => this.run());
  }
}

export default Game;
