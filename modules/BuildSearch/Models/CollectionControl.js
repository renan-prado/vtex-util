const kItem = Symbol('kItem');

class CollectionControl {
  constructor() {
    this[kItem] = [];
  }

  set(categ) {
    this[kItem].push(categ)
  }

  has() {
    return true;
  }

  get result() {
    return this[kItem];
  }

  clear() {
    this[kItem] = [];
  }
}

module.exports = CollectionControl;