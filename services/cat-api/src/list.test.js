const lambdaWrapper = require('lambda-wrapper');
const CatModel = require('common_lib/models/cat');
const mockingoose = require('mockingoose').default; // import this to help with mocking
const lambda = require('./list');

const handler = lambdaWrapper.wrap(lambda);
const mockcats = [
  {
    name: 'Wolff Ergonomic cat',
    description: 'This is a test description',
    origin: 'Finland',
    temperament: 'Fluffy',
    pictureUrl: 'www.com',
  },
  {
    name: 'Ergonomic cat 2',
    description: 'lorem Ipsum',
    origin: 'Sweden',
    temperament: 'Fluffy',
    pictureUrl: 'www.com',
  },
  {
    name: 'Ergonomic cat 34',
    description: 'This is a test description',
    origin: 'Vietnam',
    temperament: 'Fluffy',
    pictureUrl: 'www.com',
  },
];
const mockTotal = 200;

describe('Get /cats?limit=<limit>....', () => {
  it('Should succeed with valid ', async () => {
    const event = () => ({});
    jest.spyOn(CatModel, 'paginationQuery').mockReturnValue(Promise.resolve({ cats: mockcats, total: mockTotal }));
    const response = await handler.run(event());
    expect(response.statusCode).toEqual(200);
    const responseBody = JSON.parse(response.body);
    expect(responseBody.cats.length).toEqual(3);
    expect(responseBody.total).toEqual(200);
  });
  it('Should return 500 when pagination method throw error ', async () => {
    const event = () => ({});
    jest.spyOn(CatModel, 'paginationQuery')
      .mockImplementation(() => { throw Error('something wrong'); });
    const response = await handler.run(event());
    expect(response.statusCode).toEqual(500);
  });
});
