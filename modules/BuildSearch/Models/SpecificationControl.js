const kItems = Symbol('kItems');

class SpecificationControl {
  constructor() {
    this[kItems] = [];
  }

  set(categ) {
    this[kItems].push(categ)
  }

  has() {
    return true;
  }

  get result() {
    return this[kItems];
  }

  clear() {
    this[kItems] = [];
  }
}

module.exports = SpecificationControl;