const { encrypt } = require('../../app/helpers/encrypt');
const { credentialsMock } = require('../mocks/user');
const { factory } = require('factory-girl');
const { factoryWithCustomizedValue } = require('./factory_by_models');

factoryWithCustomizedValue('User', 'password', encrypt(credentialsMock.password));
exports.createUser = attributes => factory.create('User', attributes);
exports.createManyUser = (number, attributes) => factory.createMany('User', number, attributes);
