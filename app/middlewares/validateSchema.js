const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { schemaError } = require('../errors');

const ajv = new Ajv();
addFormats(ajv);

module.exports.validateSchema = schema => (req, res, next) => {
  const validate = ajv.compile(schema);
  if (validate(req.body)) return next();

  next(schemaError(validate.errors));
}
