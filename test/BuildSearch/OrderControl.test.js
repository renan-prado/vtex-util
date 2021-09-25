const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const BuildSearch = require('../../modules/BuildSearch');
const { ParameterTypeError } = require('../../modules/ErrorControl/Errors');

describe('~~ INDEX', () => {
  describe('testando erros e log', () => {
    let buildSearch;

    beforeEach(() => {
      buildSearch = new BuildSearch();
    });
  });
});
