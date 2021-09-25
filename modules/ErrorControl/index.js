const { ParameterTypeError } = require('./Errors');

function throwError(name, error) {
  switch (name) {
    case 'ParameterTypeError':
      throw new ParameterTypeError(error);

    default:
      break;
  }
}

module.exports = {
  throwError,
};
