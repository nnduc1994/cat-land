// This is just for seeding db purpose, hence code quality and readability is not guarantee

const faker = require('faker');
const mongoose = require('mongoose');
const CatModel = require('../models/cat');

const catTemperament = ['Skittishness', 'Outgoingness', 'Dominance', 'Spontaneity', 'Friendliness', 'Fluffy', 'Dumb af'];
const catPicsURL = [
  'https://www.kindpng.com/picc/m/41-414046_transparent-funny-faces-png-grumpy-cat-face-transparent.png',
  'https://i.ytimg.com/vi/IWwZAg9zt8U/hqdefault.jpg',
  'https://i.chzbgr.com/full/9112752128/h94C6655E/cute-cat-looking-at-the-camera-with-its-ears-hiding',
  'https://sadanduseless.b-cdn.net/wp-content/uploads/2014/06/funny-cat2.jpg',
  'https://funnylole.files.wordpress.com/2014/06/f70a6-cutecatfaces3.jpg?w=376',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsw2-aNpIILLB0FgzaSbigwhOOs8t9YyT9hYMeTJsfwCYfy5Pm&usqp=CAU',
  'https://www.womansworld.com/wp-content/uploads/2019/07/silly-cat-face.jpg?w=750',
  'https://www.lolwhy.com/javascript/uploads/2019/12/Funny-Cat-faces-to-put-that-smile-on-your-face-17.jpg',
  'https://miscmedia-9gag-fun.9cache.com/images/thumbnail-facebook/1557391851.3248_Za4UdA_n.jpg',
  'https://i.pinimg.com/474x/c5/75/aa/c575aa58a4daa3372d219094ccb8576e.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcStTuU1VTZ8I1oobqQkDWS6O5azWaRBii8hZ8z8zjKb128v12RQ&usqp=CAU',
];


const connectionString = 'mongodb://<username>:<password>@cluster0-shard-00-00-vrhf8.mongodb.net:27017,cluster0-shard-00-01-vrhf8.mongodb.net:27017,cluster0-shard-00-02-vrhf8.mongodb.net:27017/cat-api-prod?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.Promise = global.Promise;
mongoose.connect(connectionString);


const generateCat = async () => {
  const cats = [];
  let i = 0;
  while (i < 200) {
    const cat = {
      name: `${faker.name.lastName()} ${faker.commerce.productAdjective()} cat`,
      description: faker.lorem.sentences(),
      origin: faker.address.country(),
      pictureURL: catPicsURL[Math.floor(Math.random() * catPicsURL.length)],
      temperament: catTemperament[Math.floor(Math.random() * catTemperament.length)],
    };
    cats.push(cat);
    i += 1;
  }
  await Promise.all(cats.forEach((cat) => CatModel.create(cat)));
};


generateCat();
