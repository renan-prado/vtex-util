/* eslint-disable no-unused-expressions */
const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const BuildSearch = require('../../modules/BuildSearch');
const { ParameterTypeError } = require('../../modules/ErrorControl/Errors');

describe('~~ CATEGORIES', () => {
  const setParamList = [0, 1, {}, null, undefined, true, false];
  const safeArray1 = ['Foo', 'Meaw'];
  const safeArray2 = ['Go', 'Pow', 'Cow'];
  const safeParaList = [...safeArray1, ...safeArray2, safeArray1, safeArray2];

  describe('-- Set Category', () => {
    let buildSearch;

    beforeEach(() => {
      buildSearch = new BuildSearch();
    });

    it('deve testar os tipos dos parametros', () => {
      setParamList.forEach((type) => {
        expect(() => buildSearch.categories(type)).to.throw(ParameterTypeError);
      });

      safeParaList.forEach((type) => {
        expect(() => buildSearch.categories(type)).to.not.throw();
      });
    });

    it('deve setar uma category por string', () => {
      buildSearch.categories('Foo');
      const list = buildSearch.getCategories();
      expect(list).to.deep.include('Foo');
    });

    it('deve setar varias categories por array', () => {
      buildSearch.categories(safeArray1);
      const list = buildSearch.getCategories();
      expect(list).to.deep.include('Foo');
      expect(list).to.deep.include('Meaw');
    });

    it('deve testar o retorno da instancia', () => {
      expect(buildSearch.categories('')).to.be.an.instanceof(BuildSearch);
      expect(buildSearch.categories([])).to.be.an.instanceof(BuildSearch);
    });
  });

  describe('-- Has Category', () => {
    let buildSearch;

    beforeEach(() => {
      buildSearch = new BuildSearch();
    });

    it('deve verificar tipos dos parametros', () => {
      setParamList.forEach((type) => {
        expect(() => buildSearch.hasCategories(type)).to.throw(ParameterTypeError);
      });

      safeParaList.forEach((type) => {
        expect(() => buildSearch.hasCategories(type)).to.not.throw();
      });
    });

    it('deve verificar Category por String (sucesso/fracasso)', () => {
      buildSearch.categories(safeArray1);
      const hasFoo = buildSearch.hasCategories('Foo');
      expect(hasFoo).to.be.true;
      const notHasBanana = buildSearch.hasCategories('Banana');
      expect(notHasBanana).to.be.false;
    });

    it('deve verificar Categories por Array (sucesso/fracasso)', () => {
      buildSearch.categories(safeArray1);
      const hasFoo = buildSearch.hasCategories(safeArray1);
      expect(hasFoo).to.be.true;
      const notHasBanana = buildSearch.hasCategories([...safeArray1, 'Taco']);
      expect(notHasBanana).to.be.false;
    });

    it('deve verificar retorno da Instancia', () => {
      expect(buildSearch.hasCategories('')).to.be.a('boolean');
      expect(buildSearch.hasCategories([])).to.be.a('boolean');
      buildSearch.brands(safeArray1);
      expect(buildSearch.hasCategories('Foo')).to.be.a('boolean');
      expect(buildSearch.hasCategories(['Foa'])).to.be.a('boolean');
    });
  });

  describe('-- Clear Category', () => {
    let buildSearch;

    beforeEach(() => {
      buildSearch = new BuildSearch();
    });

    it('deve limpar uma category', () => {
      buildSearch.categories(safeArray1);
      buildSearch.clearCategories();
      const list = buildSearch.getCategories();
      expect(list).to.be.empty;
    });

    it('deve verificar retorno da instancia', () => {
      expect(buildSearch.clearCategories()).to.be.an.instanceof(BuildSearch);
    });
  });
});
