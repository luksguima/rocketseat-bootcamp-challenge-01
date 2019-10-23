const express = require('express');

const server = express();

server.use(express.json());

const projects = [];


//Middleware que ira verificar se o projeto existe. 
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project not found' });
  }

  return next();
}

//Middleware que da log no número de requisições.
function logRequests(req, res, next) {

  console.count("Número de requisições");

  return next();
}

server.use(logRequests);

//Retorna todos os projetos existentes 
server.get('/projects', (req, res) => {
  return res.json(projects);
});

//Cadastra um novo projeto.
 server.post('/projects', (req, res) => {
   const { id, title } = req.body;

   const project = {
     id,
     title,
     tasks: []
   };

   projects.push(project);

   return res.json(project);
 }); 

 //Altera o titulo do projeto com o id presente no params da rota.
 server.put('/projects/:id', checkProjectExists, (req, res) => {
   const { id } = req.params;
   const { title } = req.body;

   const project = projects.find(p => p.id == id);

   project.title = title;

   return res.json(project);
 });
 
 //Deleta o projeto associado ao id presente no params da rota.
 server.delete('/projects/:id', checkProjectExists, (req, res) => {
   const { id } = req.params;

   const projectIndex = projects.findIndex(p => p.id == id);
   
   projects.splice(projectIndex, 1);

   return res.send()
 });

 //Adiciona uma nova tarefa ao projeto selecionado via id.
 server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
   const { id } = req.params;
   const { title } = req.body;

   const project = projects.find(p => p.id == id);

   project.tasks.push(title);

   return res.json(project);

 });

server.listen(3000);