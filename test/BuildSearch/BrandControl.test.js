/* eslint-disable no-unused-expressions */
const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const BuildSearch = require('../../modules/BuildSearch');
const { ParameterTypeError } = require('../../modules/ErrorControl/Errors');

describe('~~ BRAND', () => {
  const setParamList = [0, 1, {}, null, undefined, true, false];
  const safeArray1 = ['Foo', 'Meaw'];
  const safeArray2 = ['Go', 'Pow', 'Cow'];
  const safeParaList = [...safeArray1, ...safeArray2, safeArray1, safeArray2];
  describe('-- Set Brand', () => {
    let buildSearch;

    beforeEach(() => {
      buildSearch = new BuildSearch();
    });

    it('deve testar os tipos dos parametros', () => {
      setParamList.forEach((type) => {
        expect(() => buildSearch.brands(type)).to.throw(ParameterTypeError);
      });

      safeParaList.forEach((type) => {
        expect(() => buildSearch.brands(type)).to.not.throw();
      });
    });

    it('deve setar uma brand por string', () => {
      buildSearch.brands('Foo');
      const list = buildSearch.getBrands();
      expect(list).to.deep.include('Foo');
    });

    it('deve setar varias brands por array', () => {
      buildSearch.brands(safeArray1);
      const list = buildSearch.getBrands();
      expect(list).to.deep.include('Foo');
      expect(list).to.deep.include('Meaw');
    });

    it('deve testar o retorno da instancia', () => {
      expect(buildSearch.brands('')).to.be.an.instanceof(BuildSearch);
      expect(buildSearch.brands([])).to.be.an.instanceof(BuildSearch);
    });
  });

  describe('-- Has Brand', () => {
    let buildSearch;

    beforeEach(() => {
      buildSearch = new BuildSearch();
    });

    it('deve verificar tipos dos parametros', () => {
      setParamList.forEach((type) => {
        expect(() => buildSearch.hasBrands(type)).to.throw(ParameterTypeError);
      });

      safeParaList.forEach((type) => {
        expect(() => buildSearch.hasBrands(type)).to.not.throw();
      });
    });

    it('deve verificar Brand por String (sucesso/fracasso)', () => {
      buildSearch.brands(safeArray1);
      const hasFoo = buildSearch.hasBrands('Foo');
      expect(hasFoo).to.be.true;
      const notHasBanana = buildSearch.hasBrands('Banana');
      expect(notHasBanana).to.be.false;
    });

    it('deve verificar Brand por Array (sucesso/fracasso)', () => {
      buildSearch.brands(safeArray1);
      const hasFoo = buildSearch.hasBrands(safeArray1);
      expect(hasFoo).to.be.true;
      const notHasBanana = buildSearch.hasBrands([...safeArray1, 'Taco']);
      expect(notHasBanana).to.be.false;
    });

    it('deve verificar retorno da Instancia', () => {
      expect(buildSearch.hasBrands('')).to.be.a('boolean');
      expect(buildSearch.hasBrands([])).to.be.a('boolean');
      buildSearch.brands(safeArray1);
      expect(buildSearch.hasBrands('Foo')).to.be.a('boolean');
      expect(buildSearch.hasBrands(['Foa'])).to.be.a('boolean');
    });
  });

  describe('-- Clear Brand', () => {
    let buildSearch;

    beforeEach(() => {
      buildSearch = new BuildSearch();
    });

    it('deve limpar uma brand', () => {
      buildSearch.brands(safeArray1);
      buildSearch.clearBrands();
      const list = buildSearch.getBrands();
      expect(list).to.be.empty;
    });

    it('deve verificar retorno da instancia', () => {
      expect(buildSearch.clearBrands()).to.be.an.instanceof(BuildSearch);
    });
  });
});
