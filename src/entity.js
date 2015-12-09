'use strict';

let counter = 0;

class Entity {
  constructor(components) {
    this.id = counter++;
    this.components = Object.create(null);

    if (components) {
      for (let component of components) {
        this.setComponent(component);
      }
    }
  }

  setComponent(component) {
    this.components[component.type] = component;

    return this;
  }

  getComponent(type) {
    return this.components[type];
  }

  removeComponent(type) {
    delete this.components[type];

    return this;
  }
}

export default Entity;
