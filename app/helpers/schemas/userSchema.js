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
    email: {
      type: 'string',
      format: 'email',
      pattern: '@wolox.'
    },
    password: {
      type: 'string',
      minLength: 8,
      pattern: '^[a-zA-Z0-9]*$'
    },
  },
  required: ['name', 'lastName', 'email', 'password'],
  additionalProperties: false
}
