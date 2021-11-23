const { factory } = require('factory-girl');
const { factoryByModel} = require('./factory_by_models');

factoryByModel('Weet');
exports.createWeet = attributes => factory.create('Weet', attributes);
exports.createManyWeet = (number, attributes) => factory.createMany('Weet', number, attributes);
