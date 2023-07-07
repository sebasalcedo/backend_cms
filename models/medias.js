const { Schema, model } = require('mongoose');

const mediaSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: false
    },
    fileUrl: {
      type: String,
      required: false
    },
    downloadURL:{
      type: String,
      required: false
    }
  },
  { timestamps: true, collection: 'media' }
);

mediaSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model('Media', mediaSchema);
