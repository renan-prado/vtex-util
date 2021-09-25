/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

// TODO: utilizar new Map() e new Set/WeakSet()

class SearchControl {
    constructor(context) {
        this._baseSearchAPI = '/api/catalog_system/pub/products/search';
        this._history = [];
        this._keys = [];
        this._map = [];
        this._fetch = false;

        this._fromDefined = false;
        this._toDefined = false;

        this.define(context);
        this.definePagination(context);
    }

    get baseUrl() {
        return this._baseUrl;
    }

    get result() {
        return this.mountURL();
    }

    get history() {
        return this._history;
    }

    get perPage() {
        return this._perPage;
    }

    get page() {
        return this._page;
    }

    get from() {
        return this._from;
    }

    get to() {
        return this._to;
    }

    get lastSearch() {
        if (this._history.length > 1) {
            return this._history.slice(-2, -1)[0];
        }
        return '';
    }

    mountURL() {
        if (!this.permissionSearch() || !this._fetch) return '';

        const _joinKeys = this._keys.join('/');
        const _joinMap = this._map.join();
        const _pagination = this._fromDefined && this._toDefined ? `&_from=${this._from}&_to=${this._to}` : '';
        const _order = `&O=${this._order}`;
        let _mapQuery = '?';

        if (this.hasMap()) {
            _mapQuery = `/${_joinKeys}?map=${_joinMap}`;
        }

        const { _ft } = this;
        let _ftUrlParam = '';

        const { _price } = this;
        let _priceUrlParam = '';

        if (this.exists(_ft)) {
            _ftUrlParam = `&ft=${_ft}`;
        }

        if (this.exists(_price)) {
            if (_price.length > 1) {
                const _priceFrom = _price[0] === 0 ? 0.01 : _price[0];
                _priceUrlParam = `&fq=P:[${_priceFrom} TO ${_price[1]}]`;
            }
        }

        return this._baseUrl + _mapQuery + _ftUrlParam + _priceUrlParam + _pagination + _order;
    }

    fetch() {
        this._keys = [];
        this._map = [];
        this._categories.forEach((category) => this.setMapFilter(category, 'c'));
        this._brands.forEach((brand) => this.setMapFilter(brand, 'b'));
        this._specifications
            .forEach((spec) => this.setMapFilter(spec.value, spec.name));

        const { _collection } = this;

        if (this.exists(_collection)) {
            this.setMapFilter(_collection, 'productClusterIds');
        }

        this._fetch = true;
        this._history.push(this.mountURL());
    }

    define({
        specifications,
        categories,
        collection,
        baseUrl,
        brands,
        order,
        price,
        ft,
    }) {
        this._specifications = specifications || (this._specifications || []);
        this._categories = categories || (this._categories || []);
        this._collection = collection || (this._collection || '');
        this._baseUrl = (baseUrl || (this._baseUrl || '')) + this._baseSearchAPI;
        this._brands = brands || (this._brands || []);
        this._order = order || (this._order || 'OrderByTopSaleDESC');
        this._price = price || (this._price || '');
        this._ft = ft || (this._ft || '');
    }

    update(context) {
        const {
            specifications,
            categories,
            collection,
            brands,
            price,
            order,
            from,
            to,
            ft,
        } = context;

        this._specifications = specifications || (this._specifications || []);
        this._categories = categories || (this._categories || []);
        this._collection = collection === null ? '' : (collection || this._collection);
        this._price = price === null ? '' : (price || this._price);
        this._brands = brands || (this._brands || []);
        this._ft = ft === null ? '' : (ft || this._ft);
        this._order = order === null ? 'OrderByTopSaleDESC' : (order || this._order);
        this._firstFrom = from || this._firstFrom;
        this._firstTo = to || this._firstTo;

        this.definePagination(context);
    }

    // PAGINACAO -----------------------------------

    definePagination({
        page, from, to, perPage,
    }) {
        const pageDefault = this._page > 0 ? this._page : 1;
        const perPageDefault = this._perPageDefined ? this._perPage : 48;

        this._perPage = perPage > 0 ? perPage : perPageDefault;
        this._page = page > 0 ? page : pageDefault;

        const fromDefault = ((this._page - 1) * this._perPage) + (this._firstFrom || 0);
        const toDefault = this._page * this._perPage + (this._firstTo || 0);

        if (!this._perPageDefined) {
            this._perPageDefined = true;
        }

        this._from = from > 0 ? from : fromDefault;
        this._to = to > 0 ? to : toDefault;

        if (!this._fromDefined) {
            this._fromDefined = true;
            this._firstFrom = from || 0;
        }

        if (!this._toDefined) {
            this._toDefined = true;
            this._firstTo = to || 0;
        }
    }

    nextPage() {
        this._page += 1;
        this.definePagination({});
    }

    prevPage() {
        this._page = this._page < 2 ? 1 : this._page - 1;
        this.definePagination({});
    }

    // ----------------------------------------------

    setMapFilter(key, value) {
        if (!this.exists(key) || !this.exists(value)) return false;
        this._keys.push(key);
        this._map.push(value);
        return true;
    }

    exists(value) {
        return value && typeof value !== 'undefined' && value !== '';
    }

    permissionSearch() {
        return (
            this._ft.length
          || this._specifications.length
          || this._categories.length
          || this._brands.length
          || this.exists(this._collection)
          || this._ft.length
        );
    }

    hasMap() {
        return (
            this._specifications.length
          || this._categories.length
          || this._brands.length
          || this.exists(this._collection)
        );
    }
}

module.exports = SearchControl;
