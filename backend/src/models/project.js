import {Schema, model} from 'mongoose';

const ProjectSchema = new Schema({
    name: String,
    description: String,
    url: String
});

export default model('Project', ProjectSchema);
