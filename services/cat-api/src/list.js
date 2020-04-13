/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-catch */

const middy = require('@middy/core');
const cors = require('@middy/http-cors');
const mongoose = require('mongoose');
const boom = require('@hapi/boom');

const { defaultJson, boomErrorHandler } = require('common_lib/middleware');
const CatModel = require('common_lib/models/cat');


const handler = async (event) => {
  try {
    const connectionString = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPassword}@cluster0-vrhf8.mongodb.net/${process.env.mongoDB}?retryWrites=true&w=majority`;
    mongoose.Promise = global.Promise;

    const connector = await mongoose.connect(connectionString,
      {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
      });

    const {
      limit = 10, offset = 0, name = '', origin = '',
    } = event.queryStringParameters || {};

    // { cats: [], total: Num}
    const paginatedObj = await CatModel.paginationQuery(limit, offset, name, origin);

    if (connector) await connector.disconnect();
    return paginatedObj;
  } catch (e) {
    throw boom.internal();
  }
};


const lambda = middy(handler)
  .use(cors())
  .use(defaultJson())
  .use(boomErrorHandler);


module.exports = { handler: lambda };
