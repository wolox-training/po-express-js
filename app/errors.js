const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);

exports.SCHEMA_ERROR = 'schema_error';
exports.schemaError = message => internalError(message, exports.SCHEMA_ERROR);

exports.EMAIL_ERROR = 'email_duplicate_error';
exports.emailError = message => internalError(message, exports.EMAIL_ERROR);
