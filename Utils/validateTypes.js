function validateType(value, types) {
  let valueType;

  if (Array.isArray(value)) {
    valueType = 'array';
  } else {
    valueType = typeof value;
  }

  return types.includes(valueType);
}

module.exports = validateType;
