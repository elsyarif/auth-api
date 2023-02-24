const InvarianError = require('../../../commons/exceptions/InvariantError');
const AuthTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const pool = require('../../database/postgres/pool');
const AuthenticationRepositoryPostrgres = require('../AuthenticationRepositoryPostgres');

describe('AuthenticationRepository postgres', () => {
  afterEach(async () => {
    await AuthTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addToken function', () => {
    it('should add token to database', async () => {
      // arrange
      const authenticationRepository = new AuthenticationRepositoryPostrgres(pool);
      const token = 'token';

      // action
      await authenticationRepository.addToken(token);

      // assert
      const tokens = await AuthTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(1);
      expect(tokens[0].token).toBe(token);
    });
  });

  describe('checkAvailabilityToken function', () => {
    it('should throw InvariantError if token not available', async () => {
      // arrange
      const authenticationRepository = new AuthenticationRepositoryPostrgres(pool);
      const token = 'token';

      // action and assert
      await expect(authenticationRepository.checkAvailabilityToken(token))
        .rejects.toThrowError(InvarianError);
    });

    it('should not throw InvariantError if token available', async () => {
      // arrange
      const authenticationRepository = new AuthenticationRepositoryPostrgres(pool);
      const token = 'token';

      await AuthTableTestHelper.addToken(token);

      // action and assert
      await expect(authenticationRepository.checkAvailabilityToken(token))
        .resolves.not.toThrowError(InvarianError);
    });
  });

  describe('deleteToken', () => {
    it('should delete token from database', async () => {
      // arrange
      const authenticationRepository = new AuthenticationRepositoryPostrgres(pool);
      const token = 'token';
      await AuthTableTestHelper.addToken(token);

      // action
      await authenticationRepository.deleteToken(token);

      // assert
      const tokens = await AuthTableTestHelper.findToken(token);
      expect(tokens).toHaveLength(0);
    });
  });
});
