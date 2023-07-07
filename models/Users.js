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
<<<<<<< HEAD
    company:{
      type: String,
      required:false
    },
    job: {
      type: String,
      required:false
    },
    about: {
      type: String,
      required:false
    },
    twitter_profile:{
      type: String,
      required:false
    },
    facebook_profile:{
      type: String,
      required:false
    },

    instagram_profile:{
      type: String,
      required:false
    },
    linkedin_profile:{
      type: String,
      required:false
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
=======
    img: {
      type: String,
    },
    rol: {
      type: String,
      required: true,
      default: 'Content',
>>>>>>> 494b816e14407c4871632ccf81f4e019a201c871
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
