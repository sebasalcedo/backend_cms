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
    line: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Lines',
    },
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
