const { Schema, model } = require('mongoose');

const ProgramsSchema = Schema(
  {
    program_name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    coverage:   {
        type: String,
        required: false,
      },
    
    menu_option: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      delfault: 'A',
      required: false,
    },
    Steps:[{
    
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'Steps',
      
    }],
    description: {
      type: String,
      required: false,
    },
    program_type: {
      type: String,
      required: true,
    },
    Subcategory: {
      type: String,
      required: true,
    },
    Timezone_from: {
      type: String,
      required: true,
    },
    chatbot: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: 'Users',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
  { collection: 'programs' }
);

ProgramsSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;
  return object;
});

module.exports = model('Programs', ProgramsSchema);
