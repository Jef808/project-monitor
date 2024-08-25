import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import {Octokit} from 'octokit';

dotenv.config();

const app = express();
app.use(express.json());

const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  }
};

async function run () {
  try {
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    console.log("Successfully connected to MongoDB!");
  } finally {
    await mongoose.disconnect();
  }
}

// run().catch(console.dir);

const octokit = new Octokit();
const response = await octokit.request(`GET /repos/{owner}/{repo}/commits`, {
  owner: 'Jef808',
  repo: 'ellm',
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  },
  per_page: 1
});

const sha = response.data[0].sha;

const commit = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{sha}', {
  owner: 'Jef808',
  repo: 'ellm',
  sha: sha,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28'
  }
});

console.log(JSON.stringify(commit, null, 2));
