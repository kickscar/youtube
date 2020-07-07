import mongoose from 'mongoose';

const ancestor = new mongoose.Schema({
    name: String,
    _id: mongoose.Schema.Types.ObjectId
});

const category = new mongoose.Schema({
    name: String,
    descripttions: String,
    ancestors: {
        type: [ancestor],
        default: undefined
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        default: undefined
    }
}, {
    versionKey: false
});

// autoIncrement.initialize(mongoose.connection);
// category.plugin(autoIncrement.plugin, 'Category');

export default mongoose.model('Category', category);