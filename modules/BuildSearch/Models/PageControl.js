const kItems = Symbol('kItems');

class PageControl {
  constructor() {
    this[kItems] = [];
  }

  set(categ) {
    this[kItems].push(categ);
  }

  get result() {
    return this[kItems];
  }

  clear() {
  }

  set from(arg) {

  }

  get from() {

  }

  set to(arg) {

  }

  get to() {

  }

  set itemsPerPage(arg) {
  }

  get itemsPerPage() {

  }
}

module.exports = PageControl;
