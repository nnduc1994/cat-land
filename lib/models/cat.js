const mongoose = require('mongoose');

const { Schema } = mongoose;

const CatSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  temperament: {
    type: String,

  },
  origin: {
    type: String,
  },
});


module.exports = mongoose.model('Cats', CatSchema);
