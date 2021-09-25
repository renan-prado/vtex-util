const kItem = Symbol('kItem');

class OrderControl {
  constructor() {
    this[kItem] = [];
  }

  set(categ) {
    this[kItem].push(categ)
  }

  clear() {
    this[kItem] = [];
  }

  get result() {
    return this[kItem];
  }
}

module.exports = OrderControl;