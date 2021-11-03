const Ajv = require("ajv");
const ajv = new Ajv();

module.exports.validateSchema = (schema) => {
  return (req, res, next) => {
    const validate = ajv.compile(schema);
    validate(req.body) ? next() : res.status(400).send(validate.errors);
  };
}
