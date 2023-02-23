class UserLogin {
  constructor(payload) {
    this._validationPayload(payload);

    this.username = payload.username;
    this.password = payload.password;
  }

  _validationPayload(payload) {
    const { username, password } = payload;

    if (!username || !password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_NEED_PROPERTY');
    }

    if (typeof username !== 'string' || typeof password !== 'string') {
      throw new Error('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = UserLogin;
