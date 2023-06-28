const { Schema, model } = require('mongoose');

const UserSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: false,
    },
    isActivated : {
      type: Number,
      required:true,
      default:1
    },
    role: {
      type: String,
      required: true,
      default: 'CONTENIDO',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  { collection: ' user' }
);

UserSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model('Users', UserSchema);
