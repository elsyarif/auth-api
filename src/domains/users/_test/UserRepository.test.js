const UserRepository = require('../UserRepository');

describe('UserRepository interface', () => {
  it('should throw erroe when invoke abstract behavior', async () => {
    // arange
    const userRepostory = new UserRepository();

    // action and assert
    await expect(userRepostory.addUser({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(userRepostory.verifyAvailableUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
