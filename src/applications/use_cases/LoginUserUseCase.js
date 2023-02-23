const UserLogin = require('../../domains/users/entities/UserLogin');
const NewAuthentication = require('../../domains/authentications/entities/NewAuth');

class LoginUserUseCase {
  constructor({
    userRepository,
    authRepository,
    authTokenManager,
    passwordHash,
  }) {
    this._userRepository = userRepository;
    this._authRepository = authRepository;
    this._authTokenManager = authTokenManager;
    this._passwordHash = passwordHash;
  }

  async execute(useCasePayload) {
    const { username, password } = new UserLogin(useCasePayload);

    const encryptedPassword = await this._userRepository.getPasswordByUsername(username);

    await this._passwordHash.compare(password, encryptedPassword);

    const accessToken = await this._authTokenManager.createAccessToken({ username });
    const refreshToken = await this._authTokenManager.createRefreshToken({ username });

    const newAuthentication = new NewAuthentication({
      accessToken,
      refreshToken,
    });

    await this._authRepository.addToken(newAuthentication.refreshToken);

    return newAuthentication;
  }
}

module.exports = LoginUserUseCase;
