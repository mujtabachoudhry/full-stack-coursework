const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const FitnessLogSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    exercise: {
        type: String,
        required: true,
    },
    duration: {
        type: Number, // duration in minutes
        required: true,
    },
    calories_burned: {
        type: Number,
        required: true,
    },
    intensity: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    notes: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true,
});

FitnessLogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('FitnessLog', FitnessLogSchema);
