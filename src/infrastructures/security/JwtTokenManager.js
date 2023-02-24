const AuthenticationTokenManager = require('../../applications/security/AuthenticationTokenManager');
const InvariantError = require('../../commons/exceptions/InvariantError');

class JwtTokenManager extends AuthenticationTokenManager {
  constructor(jwt) {
    super();
    this._jwt = jwt;
  }

  async createAccessToken(payload) {
    return this._jwt.generate(payload, process.env.ACCESS_TOKEN_KEY);
  }
}

module.exports = JwtTokenManager;
