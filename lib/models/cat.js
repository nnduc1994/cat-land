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
  pictureURL: {
    type: String,
  },
});

CatSchema.statics.paginationQuery = async function (limit, offset, name, origin) {
  let findObject = { };

  if (name) {
    findObject = { name: { $regex: name, $options: 'i' } };
  }

  if (origin) {
    findObject = { ...findObject, origin: { $regex: origin, $options: 'i' } };
  }

  const cats = await this.find(findObject)
    .limit(Number(limit))
    .skip(Number(offset));

  const total = await this.count(findObject);

  return { cats, total };
};

module.exports = mongoose.model('Cats', CatSchema);
