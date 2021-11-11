module.exports.credentialsSchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      pattern: '@wolox.(com|co|cl|ar)$'
    },
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^[a-zA-Z0-9]*$'
    }
  },
  required: ['email', 'password'],
  additionalProperties: false
}

module.exports.userSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 1
    },
    lastName: {
      type: 'string',
      minLength: 1
    },
    ...this.credentialsSchema.properties
  },
  required: ['name', 'lastName', 'email', 'password'],
  additionalProperties: false
};
