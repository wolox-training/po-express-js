const { encrypt } = require('../../app/helpers/encrypt');
const { credentialsMock } = require('../mocks/user');
const { factory } = require('factory-girl');
const { factoryWithCustomizedValue } = require('./factory_by_models');

factoryWithCustomizedValue('User', 'password', encrypt(credentialsMock.password));
exports.factoryUser = attributes => factory.create('User', attributes);
exports.factoryManyUser = (number,attributes) => factory.createMany('User',number,attributes);
