/* eslint-disable no-useless-catch */
/* eslint-disable import/prefer-default-export */

import middy from '@middy/core';
import cors from '@middy/http-cors';
import { defaultJson, boomErrorHandler } from 'common_lib/middleware';
import CatModel from 'common_lib/models/cat';
import boom from '@hapi/boom';

const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const connectionString = `mongodb://${process.env.mongoUser}:${process.env.mongoPassword}@cluster0-shard-00-00-vrhf8.mongodb.net:27017,cluster0-shard-00-01-vrhf8.mongodb.net:27017,cluster0-shard-00-02-vrhf8.mongodb.net:27017/cat-api-dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

const handler = async (event) => {
  try {
    const { catId } = event.pathParameters;
    if (!ObjectId.isValid(catId)) throw boom.badRequest('not valid ID');

    const cat = await CatModel.findById(catId);
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
