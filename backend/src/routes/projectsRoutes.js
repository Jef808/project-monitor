import {Router} from 'express';
import ProjectModel from '../models/project.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const projects = await ProjectModel.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({message: 'Error fetching projects', error});
    }
});

router.post('/', async (req, res) => {
    try {
        const {name, description, url} = req.body;

        const existingProject = await ProjectModel.findOne({name});
        if (existingProject) {
            return res.status(409).json({message: 'A project with this name already exists'});
        }

        const newProject = new ProjectModel({name, description, url});
        const savedProject = await newProject.save();

        res.status(201).json(savedProject);
    } catch (error) {
        res.status(500).json({message: 'Error creating project', error});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await ProjectModel.deleteOne({_id: req.params.id});
        res.status(204).send();
    } catch (error) {
        res.status(500).json({message: 'Error deleting project', error});
    }
})

export default router;
