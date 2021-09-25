const kItems = Symbol('kItems');
const validateTypes = require('../../../Utils/validateTypes');
const { throwError } = require('../../ErrorControl');

class BrandControl {
  constructor() {
    this[kItems] = [];
    this.origin = 'BuildSearch';
  }

  set(brand) {
    if (validateTypes(brand, ['string', 'array'])) {
      if (Array.isArray(brand)) {
        brand.forEach((currentBrand) => this[kItems].push(currentBrand));
      } else {
        this[kItems].push(brand);
      }
    } else {
      throwError('ParameterTypeError', {
        origin: this.origin,
        method: 'brand',
        expectedTypes: ['string', 'array'],
      });
    }
  }

  has(brand) {
    if (validateTypes(brand, ['string', 'array'])) {
      if (Array.isArray(brand)) {
        return brand.every((currentBrand) => this[kItems].includes(currentBrand));
      }
      return this[kItems].includes(brand);
    }
    throwError('ParameterTypeError', {
      origin: this.origin,
      method: 'hasBrands',
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

module.exports = BrandControl;
