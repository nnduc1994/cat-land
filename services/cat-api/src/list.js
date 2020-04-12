/* eslint-disable import/prefer-default-export */
/* eslint-disable no-useless-catch */

import middy from '@middy/core';
import cors from '@middy/http-cors';
import { defaultJson, boomErrorHandler } from 'common_lib/middleware';
import CatModel from 'common_lib/models/cat';
import boom from '@hapi/boom';

const mongoose = require('mongoose');


const handler = async (event) => {
  try {
    const connectionString = `mongodb+srv://${process.env.mongoUser}:${process.env.mongoPassword}@cluster0-vrhf8.mongodb.net/${process.env.mongoDB}?retryWrites=true&w=majority`;
    mongoose.Promise = global.Promise;

    const connector = await mongoose.connect(connectionString,
      {
        useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,
      });

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

    await connector.disconnect();
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
