/* istanbul ignore file */

const { createContainer } = require('instances-container');

// external agency
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('./database/postgres/pool');

// service
const UserRepositoryPostgre = require('./repositories/UserRepositoryPostgres');
const BcryptPasswordHash = require('./security/BcryptPasswordHash');

// use case
const AddUserUseCase = require('../applications/use_cases/AddUserUseCase');
const UserRepository = require('../domains/users/UserRepository');
const PasswordHash = require('../applications/security/PasswordHash');

// create containter
const container = createContainer();

// registering service and repository
container.register([
  {
    key: UserRepository.name,
    Class: UserRepositoryPostgre,
    parameter: {
      dependencies: [
        {
          concrete: pool,
        },
        {
          concrete: nanoid,
        },
      ],
    },
  },
  {
    key: PasswordHash.name,
    Class: BcryptPasswordHash,
    parameter: {
      dependencies: [
        {
          concrete: bcrypt,
        },
      ],
    },
  },
]);

// registering use case
container.register([
  {
    key: AddUserUseCase.name,
    Class: AddUserUseCase,
    parameter: {
      injectType: 'destructuring',
      dependencies: [
        {
          name: 'userRepository',
          internal: UserRepository.name,
        },
        {
          name: 'passwordhash',
          internal: PasswordHash.name,
        },
      ],
    },
  },
]);

module.exports = container;
