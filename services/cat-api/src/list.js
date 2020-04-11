/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-catch */

import middy from '@middy/core';
import cors from '@middy/http-cors';
import { defaultJson, boomErrorHandler } from 'common_lib/middleware';
import CatModel from 'common_lib/models/cat';
import boom from '@hapi/boom';

const mongoose = require('mongoose');

const connectionString = `mongodb://${process.env.mongoUser}:${process.env.mongoPassword}@cluster0-shard-00-00-vrhf8.mongodb.net:27017,cluster0-shard-00-01-vrhf8.mongodb.net:27017,cluster0-shard-00-02-vrhf8.mongodb.net:27017/cat-api-dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

const handler = async (event) => {
  try {
    const {
      limit, offset, name, origin,
    } = event.queryStringParameters;

    let findObject = { };

    if (name) {
      findObject = { name: { $regex: name, $options: 'i' } };
    }

    if (origin) {
      findObject = { ...findObject, origin: { $regex: origin, $options: 'i' } };
    }

    const cats = await CatModel.find(findObject)
      .limit(Number(limit))
      .skip(Number(offset));

    const total = await CatModel.count(findObject);

    return { cats, total };
  } catch (e) {
    throw boom.internal();
  }
};


const lambda = middy(handler)
  .use(cors())
  .use(defaultJson())
  .use(boomErrorHandler);


export { lambda as handler };
