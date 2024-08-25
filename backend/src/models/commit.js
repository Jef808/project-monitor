import {Schema, model} from 'mongoose';

const options = {timestamps: { updatedAt: false }};

const CommitSchema = new Schema({
    sha: String,
    message: String,
}, options);

export default model('CommitModel', CommitSchema);
