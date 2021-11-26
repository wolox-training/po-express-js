module.exports.rateSchema = {
  type: 'object',
  properties: {
    score: {
      type: 'number',
      enum: [1, -1]
    }
  },
  required: ['score'],
  additionalProperties: false
};
