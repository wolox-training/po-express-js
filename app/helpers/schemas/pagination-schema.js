module.exports.paginationSchema = {
  type: 'object',
  properties: {
    limit: {
      type: 'string',
      pattern: '^[0-9]*$',
      default: '10'
    },
    page: {
      type: 'string',
      pattern: '^[0-9]*$',
      default: '1'
    }
  },
  additionalProperties: false
};
