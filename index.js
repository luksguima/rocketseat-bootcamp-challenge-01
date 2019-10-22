const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

server.get('/projects', (req, res) => {
  return res.json(projects);
});



server.listen(3000);