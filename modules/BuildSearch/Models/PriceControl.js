const kItems = Symbol('kItems');

class PriceControl {
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
  }
}

module.exports = PriceControl;