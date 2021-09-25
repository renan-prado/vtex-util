const conjunction = new Intl.ListFormat('pt-br', { style: 'long', type: 'conjunction' });
const signature = 'VTEX-UTIL ~~';

class ParameterTypeError extends Error {
  constructor({ origin, method, expectedTypes }) {
    const message = `Este metodo espera apenas os seguintes tipos de parametros: ${conjunction.format(expectedTypes)}`;
    super(message);
    this.name = `${signature} ${origin}.${method}()`;
  }
}

class ArrayLengthError extends Error {
  constructor({
    origin, method, type, expectedLength,
  }) {
    const message = `É esperado ${type} ${expectedLength} itens neste array`;
    super(message);
    this.name = `${signature} ${origin}.${method}()`;
  }
}

module.exports = {
  ParameterTypeError,
  ArrayLengthError,
};
