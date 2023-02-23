const NewAuth = require('../NewAuth');

describe('NewAuth entities', () => {
  it('should throw an error payload not contain needed property', () => {
    // arrange
    const payload = {
      accessToken: 'accessToken',
    };

    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
  });

  it('should throw an error when payload not meet data type specification', () => {
    // arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 1234,
    };

    // action and assert
    expect(() => new NewAuth(payload)).toThrowError('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
  });

  it('should create newAuth entities correctly', () => {
    // arrange
    const payload = {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
    };

    // action
    const newAuth = new NewAuth(payload);

    // assert
    expect(newAuth).toBeInstanceOf(NewAuth);
    expect(newAuth.accessToken).toEqual(payload.accessToken);
    expect(newAuth.refreshToken).toEqual(payload.refreshToken);
  });
});
