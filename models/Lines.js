const { Schema, model } = require('mongoose');

const LinesSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },

    indicative: {
      type: String,
      required: false,
    },
<<<<<<< HEAD
    groups:[
      {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Groups',
      }
    ],
    
=======
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
    description: {
      type: String,
      required: false,
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  { collection: 'lines' }
);

LinesSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model('Lines', LinesSchema);
