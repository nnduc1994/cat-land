const lambdaWrapper = require('lambda-wrapper');
const CatModel = require('common_lib/models/cat');
const mockingoose = require('mockingoose').default; // import this to help with mocking
const lambda = require('./get');

const handler = lambdaWrapper.wrap(lambda);
const mockcat = {
  name: 'Wolff Ergonomic cat',
  description: 'This is a test description',
  origin: 'Finland',
  temperament: 'Fluffy',
  pictureUrl: 'www.com',
};

describe('Get /cats/{id}', () => {
  it('Should succeed with valid ', async () => {
    const event = () => ({
      pathParameters: {
        catId: '5e933b23cb71a99f8abaad03',
      },
    });
    jest.spyOn(CatModel, 'findById').mockReturnValue(Promise.resolve(mockcat));
    const response = await handler.run(event());
    expect(response.statusCode).toEqual(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.name).toEqual('Wolff Ergonomic cat');
    expect(responseBody.description).toEqual('This is a test description');
    expect(responseBody.origin).toEqual('Finland');
  });

  it('Should return 400 with invalid id', async () => {
    const event = () => ({
      pathParameters: {
        catId: '222',
      },
    });
    const response = await handler.run(event());
    expect(response.statusCode).toEqual(400);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.error.message).toEqual('not valid ID');
  });

  it('Should return 500 when there is an internal error', async () => {
    const event = () => ({
      pathParameters: {
        catId: '5e933b23cb71a99f8abaad03',
      },
    });
    jest.spyOn(CatModel, 'findById')
      .mockImplementation(() => { throw Error('something wrong'); });

    const response = await handler.run(event());
    expect(response.statusCode).toEqual(500);
  });
});
