const { Schema, model } = require('mongoose');

<<<<<<< HEAD
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
=======
const mediaSchema = Schema({
  type: {
    type: String,
    enum: ['image', 'video', 'pdf'],
    required: true
  },
  fileUrl: {
    type: String,
    required: false
  },
},{ timestamps: true, collection: 'media' },
{ collection: 'Medias' });


mediaSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Medias', mediaSchema);
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
