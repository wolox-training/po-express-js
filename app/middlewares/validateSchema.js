const Ajv = require('ajv');
const addFormats = require('ajv-formats')

const ajv = new Ajv()
addFormats(ajv);

module.exports.validateSchema = schema => (req, res, next) => {
  const validate = ajv.compile(schema);
  validate(req.body) ? next() : res.status(400).send(validate.errors);
};
