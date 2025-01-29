const express = require('express');
const Livro = require('./models/Livros');

const app = express();


// Rotas principais
app.get('/main', async (req, res) => {
  res.render('index');
});

app.get('/create-book', (req, res) => {
  res.render('create-book');
});

app.post('/create-book', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema, nota } = req.body;
  await Livro.create({  id, titulo, dtlanc, autor, genero, preco, adap_cinema, nota });
  res.redirect('/');
});

app.get('/edit-book/:id', async (req, res) => {
  let Livro = await Livro.findByPk(req.params.id);
  Livro = Livro.dataValues;
  
  res.render('edit-book', { Livro });
});

app.post('/edit-book/:id', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema, nota } = req.body;
  await Livro.update({id, titulo, dtlanc, autor, genero, preco, adap_cinema, nota }, { where: { id: req.params.id } });
  res.redirect('/');
});

app.get('/delete-book/:id', async (req, res) => {
  await Livro.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});
