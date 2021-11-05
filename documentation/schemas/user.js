module.exports = {
  name: {
    type: 'string',
    example: 'Pedro'
  },
  lastName: {
    type: 'string',
    example: 'Ortiz'
  },
  email: {
    type: 'string',
    example: 'pedro.antonio.ortiz@wolox.com.co'
  },
  password: {
    type: 'string',
    example: 'myPassword12345',
  },
  User: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      lastName: {
        $ref: '#/components/schemas/lastName'
      },
      email: {
        $ref: '#/components/schemas/email'
      },
      password: {
        $ref: '#/components/schemas/password'
      }
    }
  }
};
