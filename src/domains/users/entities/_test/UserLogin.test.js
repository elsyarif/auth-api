const { use } = require('bcrypt/promises');
const UserLogin = require('../UserLogin');

describe('UserLogin entities', () => {
  it('should throw an error when payload does not contain needed property', () => {
    // arrange
    const payload = {
      username: 'syarif',
    };

    // action and assert
    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEED_PROPERTY');
  });

  it('should throw an error when payload not meet data type specification', () => {
    // arrange
    const payload = {
      username: true,
      password: 'secret',
    };

    // action and assert
    expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create UserLogin entities correctly', () => {
    // arrange
    const payload = {
      username: 'syarif',
      password: 'secret',
    };

    // action
    const userLogin = new UserLogin(payload);

    // assert
    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.username).toEqual(payload.username);
    expect(userLogin.password).toEqual(payload.password);
  });
});
