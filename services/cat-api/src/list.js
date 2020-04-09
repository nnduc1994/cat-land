/* eslint-disable import/prefer-default-export */

import middy from '@middy/core';
import cors from '@middy/http-cors';
import { defaultJson, boomErrorHandler } from 'common_lib/middleware';
import CatModel from 'common_lib/models/cat';

const mongoose = require('mongoose');

console.log(process.env.mongoUser);
// const connectionString = `mongodb://${process.env.mongoUser}:${process.env.mongoPassword}@cluster0-shard-00-00-vrhf8.mongodb.net:27017,cluster0-shard-00-01-vrhf8.mongodb.net:27017,cluster0-shard-00-02-vrhf8.mongodb.net:27017/cat-api-dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`;

mongoose.Promise = global.Promise;
mongoose.connect(connectionString);

const handler = async (event) => {
  try {
    const cat = await CatModel.find({ });

    const testCat = new CatModel({
      name: 'The Forest Cat',
    });
    const createdProfile = await CatModel.create(testCat);


    console.log(cat);
    return 'HEY';
  } catch (e) {
    console.log(e);
  }
};


const lambda = middy(handler)
  .use(cors())
  .use(defaultJson())
  .use(boomErrorHandler);


export { lambda as handler };
