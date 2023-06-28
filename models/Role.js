const { Schema, model } = require('mongoose');

const RoleSchema = Schema(

    {
        role: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        module:[{
            type:String,
            required: false
        }]
    },{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
    { collection: 'Role' }

)

RoleSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
  
    object.id = _id;
    return object;
  });
  
  module.exports = model('Role', RoleSchema);