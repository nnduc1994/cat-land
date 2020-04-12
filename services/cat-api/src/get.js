/* eslint-disable no-useless-catch */

const cors = require('@middy/http-cors');
const boom = require('@hapi/boom');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
const middy = require('@middy/core');

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

    const { catId } = event.pathParameters;
    if (!ObjectId.isValid(catId)) throw boom.badRequest('not valid ID');
    const cat = await CatModel.findById(catId);
    await connector.disconnect();
    return cat;
  } catch (e) {
    throw e;
  }
};


const lambda = middy(handler)
  .use(cors())
  .use(defaultJson())
  .use(boomErrorHandler);


module.exports = { handler: lambda };
