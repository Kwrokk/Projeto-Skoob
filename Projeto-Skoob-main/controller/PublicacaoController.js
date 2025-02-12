const express = require('express');
const Publicacao = require('./models/Publicacoes');

const app = express();


// Rotas principais
app.get('/main', async (req, res) => {
  res.render('index');
});

app.get('/create-publication', (req, res) => {
  res.render('create-publication');
});

app.post('/create-publication', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema, nota } = req.body;
  await Livro.create({  id, titulo, dtlanc, autor, genero, preco, adap_cinema, nota });
  res.redirect('/');
});

app.get('/edit-publication/:id', async (req, res) => {
  let Livro = await Livro.findByPk(req.params.id);
  Livro = Livro.dataValues;
  
  res.render('edit-publication', { Livro });
});

app.post('/edit-publication/:id', async (req, res) => {
  const { id, titulo, dtlanc, autor, genero, preco, adap_cinema, nota } = req.body;
  await Livro.update({id, titulo, dtlanc, autor, genero, preco, adap_cinema, nota }, { where: { id: req.params.id } });
  res.redirect('/');
});

app.get('/delete-publication/:id', async (req, res) => {
  await Livro.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});
