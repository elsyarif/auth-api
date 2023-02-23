const UserRepository = require('../../../domains/users/UserRepository');
const AuthenticationRepository = require('../../../domains/authentications/AuthenticationRepository');
const NewAuth = require('../../../domains/authentications/entities/NewAuth');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const PasswordHash = require('../../security/PasswordHash');
const LoginUserUseCase = require('../LoginUserUseCase');

describe('GetAuthenticationUseCase', () => {
  it('should orchestrating the get authentication action correctly', async () => {
    // arrange
    const useCasePayload = {
      username: 'syarif',
      password: 'secret',
    };

    const expectedAuthentication = new NewAuth({
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    });

    // mocking double test
    const mockUserRepository = new UserRepository();
    const mockAuthRepository = new AuthenticationRepository();
    const mockAuthTokenManager = new AuthenticationTokenManager();
    const mockPasswordHash = new PasswordHash();

    mockUserRepository.getPasswordByUsername = jest.fn()
      .mockImplementation(() => Promise.resolve('encrypted_password'));
    mockPasswordHash.compare = jest.fn()
      .mockImplementation(() => Promise.resolve());
    mockAuthTokenManager.createAccessToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.accessToken));
    mockAuthTokenManager.createRefreshToken = jest.fn()
      .mockImplementation(() => Promise.resolve(expectedAuthentication.refreshToken));
    mockAuthRepository.addToken = jest.fn()
      .mockImplementation(() => Promise.resolve());

    // create use case instance
    const loginUserUseCase = new LoginUserUseCase({
      userRepository: mockUserRepository,
      authRepository: mockAuthRepository,
      authTokenManager: mockAuthTokenManager,
      passwordHash: mockPasswordHash,
    });

    // action
    const actualAuthentication = await loginUserUseCase.execute(useCasePayload);

    // assert
    expect(actualAuthentication).toEqual(expectedAuthentication);
    expect(mockUserRepository.getPasswordByUsername).toBeCalledWith('syarif');
    expect(mockPasswordHash.compare).toBeCalledWith('secret', 'encrypted_password');
    expect(mockAuthTokenManager.createAccessToken).toBeCalledWith({ username: 'syarif' });
    expect(mockAuthTokenManager.createRefreshToken).toBeCalledWith({ username: 'syarif' });
    expect(mockAuthRepository.addToken).toBeCalledWith(expectedAuthentication.refreshToken);
  });
});
