const Jwt = require('@hapi/jwt');
const InvariantError = require('../../../commons/exceptions/InvariantError');
const JwtTokenManager = require('../JwtTokenManager');

describe('JwtTokenManager', () => {
  describe('createAccessToken function', () => {
    it('should create access token correctly', async () => {
      // arrange
      const payload = {
        username: 'dicoding',
      };

      const mockJwtToken = {
        generate: jest.fn().mockImplementation(() => 'mock_token'),
      };

      const jwtTokenManager = new JwtTokenManager(mockJwtToken);

      // action
      const accessToken = await jwtTokenManager.createAccessToken(mockJwtToken);

      // assert
      expect(mockJwtToken.generate).toBeCalledWith(payload, process.env.ACCESS_TOKEN_KEY);
      expect(accessToken).toEqual('mock_token');
    });
  });
  // describe('createRefreshToken function', () => {});
  // describe('verifyRefreshToken function', () => {});
  // describe('decodePayload  function', () => {});
});
