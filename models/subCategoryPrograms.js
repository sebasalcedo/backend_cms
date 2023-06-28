const { Schema, model } = require('mongoose');


const subCategoryProgramsSchema = Schema(
    {
      name: {
        type: String,
        required: true,
      },
  
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
    { collection: 'subCategoryPrograms' }
  );
  
  subCategoryProgramsSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
  
    object.id = _id;
    return object;
  });
  
  module.exports = model('subCategoryPrograms', subCategoryProgramsSchema);
  