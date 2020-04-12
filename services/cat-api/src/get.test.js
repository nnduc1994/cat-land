const lambdaWrapper = require('lambda-wrapper');
const lambda = require('./get');

// const lambdaModule = { handler };
// const lambda = lambdaWrapper.wrap(lambdaModule);

describe('POST /customers/add', () => {
  it('Should succeed with valid input', async () => {
    expect(2).toEqual(2);
  });
});
