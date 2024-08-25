import {Schema, model} from 'mongoose';

const options = {timestamps: {createdAt: false, updatedAt: true}};

const ProjectSchema = new Schema({
    name: String,
    description: String,
    url: String
}, options);

export default model('Project', ProjectSchema);
