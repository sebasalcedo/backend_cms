const { Schema, model } = require('mongoose');

const StepsSchema = Schema(
  {
    numberStep: {
      type: String,
      required: true,
    },

    interaction: {
      type: String,
      required: true,
    },
<<<<<<< HEAD
    question: {
      type: String,
      required: false
    },
=======

>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
    description: {
      type: String,
      required: false,
    },

    media: {
      required: false,
      type: Schema.Types.ObjectId,
      ref: 'Medias',
    },
    user: {
      required: false,
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  { collection: 'Steps' }
);

StepsSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model('Steps', StepsSchema);
