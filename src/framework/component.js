import Controller from './core/controller';

const Component = Object.create(Controller);

Component.id = 0;
Component.type = 'component';

Component.setUniqueName = function () {
  let newName = this.name;

  if (newName.indexOf(`-${this.type}`) === -1) {
    newName = `${newName}-${this.type}-${this.id}`;
  } else {
    newName = `${newName}-${this.id}`;
  }

  this.name = newName;

  // Increment id after name is set so no duplication occurs
  this.id++

  return newName;
}

export default Component;
