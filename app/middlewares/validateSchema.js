const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { schemaError } = require('../errors');

const ajv = new Ajv({ useDefaults: true });
addFormats(ajv);

module.exports.validateSchema = (schema, type = 'body') => (req, res, next) => {
  const validate = ajv.compile(schema);
  if (validate(req[type])) return next();

  next(schemaError(validate.errors[0].message));
}
