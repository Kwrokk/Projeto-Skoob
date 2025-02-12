const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const sequelize = require('./database');
const Livro = require('./models/Livros');
const Usuario = require('./models/Usuario');


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
  console.log('Database Conectado!');
});

// Rotas principais
app.get('/', async (req, res) => {
  //let Livros = await Livro.findAll();
  //Livros = Livros.map((Livro) => Livro.dataValues);
  
  res.render('index');
});

app.get('/create', (req, res) => {
  res.render('create');
});
app.get('/create', (req, res) => {
  res.render('create');
});
app.post('/create', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema } = req.body;
  await Livro.create({  id, titulo, dtlanc, autor, genero, preco, adap_cinema });
  res.redirect('/');
});

app.get('/edit/:id', async (req, res) => {
  let Livro = await Livro.findByPk(req.params.id);
  Livro = Livro.dataValues;
  
  res.render('edit', { Livro });
});

app.post('/edit/:id', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema } = req.body;
  await Livro.update({id, titulo, dtlanc, autor, genero, preco, adap_cinema }, { where: { id: req.params.id } });
  res.redirect('/');
});

app.get('/delete/:id', async (req, res) => {
  await Livro.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor local em: http://localhost:${PORT}`);
});
