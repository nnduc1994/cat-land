/* eslint-disable no-useless-catch */
/* eslint-disable import/prefer-default-export */

import middy from '@middy/core';
import cors from '@middy/http-cors';
import { defaultJson, boomErrorHandler } from 'common_lib/middleware';
import CatModel from 'common_lib/models/cat';
import boom from '@hapi/boom';

const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

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


export { lambda as handler };
