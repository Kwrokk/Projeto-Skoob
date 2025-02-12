const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const sequelize = require('./database');
const Usuario = require('./models/Usuario');


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced!');
});

// Rotas principais
app.get('/main-user', async (req, res) => {
  let Usuarios = await Usuario.findAll();
  Usuarios = Usuarios.map((Usuario) => Usuario.dataValues);
  
  res.render('index', { Usuarios });
});

app.get('/create-user', (req, res) => {
  res.render('create-user');
});

app.post('/create-user', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema } = req.body;
  await Usuario.create({  id, titulo, dtlanc, autor, genero, preco, adap_cinema });
  res.redirect('/');
});

app.get('/edit-user/:id', async (req, res) => {
  let Usuario = await Usuario.findByPk(req.params.id);
  Usuario = Usuario.dataValues;
  
  res.render('edit-user', { Usuario });
});

app.post('/edit-user/:id', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema } = req.body;
  await Usuario.update({id, titulo, dtlanc, autor, genero, preco, adap_cinema }, { where: { id: req.params.id } });
  res.redirect('/');
});

app.get('/delete-user/:id', async (req, res) => {
  await Usuario.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});
