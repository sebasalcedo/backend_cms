const { Schema, model } = require('mongoose');

const mediaSchema = Schema({
  name : {
    type:String,
    retquired: true
  },

  type: {
    type: String,
    enum: ['image', 'video', 'audio', 'application'], // Agrega 'application' a la enumeración
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
