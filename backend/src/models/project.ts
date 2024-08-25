import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    id: Number,
    name: String,
    url: String,
    createdAt: Date,
    updatedAt: Date
})

export default mongoose.model('ProjectModel', ProjectSchema);
