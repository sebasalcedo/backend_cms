const { Schema, model } = require('mongoose');

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
