const kItems = Symbol('kItems');
const validateTypes = require('../../../Utils/validateTypes');
const { throwError } = require('../../ErrorControl');

class CategoryControl {
  constructor() {
    this[kItems] = [];
    this.origin = 'BuildSearch';
  }

  set(categ) {
    if (validateTypes(categ, ['string', 'array'])) {
      if (Array.isArray(categ)) {
        categ.forEach((currentCateg) => this[kItems].push(currentCateg));
      } else {
        this[kItems].push(categ);
      }
    } else {
      throwError('ParameterTypeError', {
        origin: this.origin,
        method: 'categories',
        expectedTypes: ['string', 'array'],
      });
    }
  }

  has(category) {
    if (validateTypes(category, ['string', 'array'])) {
      if (Array.isArray(category)) {
        return category.every((currentCateg) => this[kItems].includes(currentCateg));
      }
      return this[kItems].includes(category);
    }
    throwError('ParameterTypeError', {
      origin: this.origin,
      method: 'hasCategories',
      expectedTypes: ['string', 'array'],
    });
    return false;
  }

  get result() {
    return this[kItems];
  }

  clear() {
    this[kItems] = [];
  }
}

module.exports = CategoryControl;
