const express = require('express');
//importa o express, que controlará as rotas,
//numa variável de mesmo nome

const { v4 } = require('uuid');
//uuid() cria um id único universal

const app = express(); //app recebe express e cria a aplicação
app.use(express.json()); //diz ao express que vamos receber json
//use() adiciona uma função pela qual todas as rotas passam

const projects = []; //temporário

app.get('/projects', (request, response) => {
  const { title, owner } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;
  //filtro de busca

  return response.json(projects);
});
//1º param recebe o endereço que vamos observar
//2º param é uma função que recebe requisição e resposta

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;
  
  const project = { 
    id: v4(), 
    title, 
    owner 
  };

  projects.push(project);
  //adiciona o projeto

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);
  //procura um id de projeto que corresponda ao id recebido

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'project not found' })
  };

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;
  //atualiza o projeto

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);
  //procura um id de projeto que corresponda ao id recebido

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'project not found' })
  };

  projects.splice(projectIndex, 1);
  //deleta o projeto contido no index

  return response.status(204).send();
  //retorno em branco
});


app.listen(3333, () => {console.log('backend tá rodando legal')});