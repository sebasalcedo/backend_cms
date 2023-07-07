const { Schema, model } = require('mongoose');

const GroupsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: false,
    },
<<<<<<< HEAD

=======
    line: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Lines',
    },
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
    programs: [
      {
        program: {
          required: false,
          type: Schema.Types.ObjectId,
          ref: 'programs',
        },
        level: {
          type: String,
          required: false,
        },
        position: {
          type: String,
          required: false,
        },
      },
    ],
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: true, collection: 'groups' }
);

GroupsSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model('Groups', GroupsSchema);
