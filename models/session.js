const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
  session: {
    type: Object,
    required: true,
  },
  expires: {
    type: Date,
    required: true,
  },
},
{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
{ collection: 'session' });

SessionSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();

    object.id = _id;
    return object;
});

module.exports = model('Session', SessionSchema);
