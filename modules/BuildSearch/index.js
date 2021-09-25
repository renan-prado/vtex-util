const Log = require('../LogControl');
// const { throwError } = require('../ErrorControl');
const BrandControl = require('./Models/BrandControl');
const CategoryControl = require('./Models/CategoryControl');
const CollectionControl = require('./Models/CollectionControl');
const OrderControl = require('./Models/OrderControl');
const PageControl = require('./Models/PageControl');
const PriceControl = require('./Models/PriceControl');
const SpecificationControl = require('./Models/SpecificationControl');

const kLog = Symbol('kLog');
const kBrand = Symbol('kBrand');
const kCategory = Symbol('kCategory');
const kCollection = Symbol('kCollection');
const kOrder = Symbol('kOrder');
const kPage = Symbol('kPage');
const kPrice = Symbol('kPrice');
const kSpecification = Symbol('kSpecification');

// TODO sobre a paginacao: deve ser resetada ao filtrar por alguma coisa

class BuildSearch {
  constructor() {
    this.name = 'BuildSearch';
    this[kLog] = new Log();
    this[kBrand] = new BrandControl();
    this[kCategory] = new CategoryControl();
    this[kCollection] = new CollectionControl();
    this[kOrder] = new OrderControl();
    this[kPage] = new PageControl();
    this[kPrice] = new PriceControl();
    this[kSpecification] = new SpecificationControl();
  }

  // Categories

  categories(arg) {
    this[kCategory].set(arg);
    return this;
  }

  getCategories() {
    return this[kCategory].result;
  }

  hasCategories(arg) {
    return this[kCategory].has(arg);
  }

  clearCategories() {
    this[kCategory].clear();
    return this;
  }

  // Brands

  brands(arg) {
    this[kBrand].set(arg);
    return this;
  }

  getBrands() {
    return this[kBrand].result;
  }

  hasBrands(arg) {
    return this[kBrand].has(arg);
  }

  clearBrands() {
    this[kBrand].clear();
    return this;
  }

  // Specifications

  set specifications(arg) {
    this[kSpecification].set(arg);
    return this;
  }

  get specifications() {
    return this[kSpecification].result;
  }

  hasSpecifications(arg) {
    this[kSpecification].has(arg);
    return this;
  }

  clearSpecifications() {
    this[kSpecification].clear();
    return this;
  }

  // Order
  set order(arg) {
    this[kOrder].set(arg);
    return this;
  }

  get order() {
    return this[kOrder].result;
  }

  clearOrder() {
    this[kOrder].clear();
    return this;
  }

  // Price

  set price(arg) {
    this[kPrice].set(arg);
    return this;
  }

  get price() {
    return this[kPrice].result;
  }

  clearPrice() {
    this[kPrice].clear();
    return this;
  }

  // Pagination
  // TODO: Criar Sync

  set page(arg) {
    this[kPage].set(arg);
    return this;
  }

  get page() {
    return this[kPage].result;
  }

  clearPage() {
    this[kPage].clear();
    return this;
  }

  set from(arg) {
    this[kPage].from(arg);
    return this;
  }

  get from() {
    return this[kPage].from;
  }

  set to(arg) {
    this[kPage].to(arg);
    return this;
  }

  get to() {
    return this[kPage].to;
  }

  set itemsPerPage(arg) {
    this[kPage].resultPerPage(arg);
    return this;
  }

  get itemsPerPage() {
    return this[kPage].resultPerPage;
  }

  // Collection

  set collection(arg) {
    this[kCollection].set(arg);
    return this;
  }

  get collection() {
    return this[kCollection].result;
  }

  clearCollection() {
    this[kCollection].clear();
    return this;
  }

  // TODO General

  // set filters(arg) {
  // }

  // get filters() {
  // }

  // clearFilters() {
  // }
}

module.exports = BuildSearch;
