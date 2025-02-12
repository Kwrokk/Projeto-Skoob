const express = require('express');
const Livro = require('../models/Livros');
const path = "layouts/livros";
const router = express.Router();


// Rotas principais
router.get('/main', async (req, res) => {
  let livros = await Livro.findAll();
  const livrosData = livros.map(livro => livro.get({ plain: true }))
  console.log(livros);
  res.render(path + '/index', { livro : livrosData });
});

router.get('/create-book', (req, res) => {
  res.render(path + '/create');
});

router.post('/create-book', async (req, res) => {
  const { título, dtlanc, autor, genero, preco, adap_cinema, nota } = req.body;
  console.log("**req.body: ", req.body);
  const livro = await Livro.create({ título, dtlanc, autor, genero, preco, adap_cinema, nota });
  console.log("**livro: ", livro);
  
  res.redirect('/');
});

router.get('/edit-book/:id', async (req, res) => {
  let livro = await Livro.findByPk(req.params.id);
  livro = livro.dataValues;
  
  res.render(path + '/edit', { livro });
});

router.post('/edit-book/:id', async (req, res) => {
  const { título, dtlanc, autor, genero, preco, adap_cinema, nota } = req.body;
  console.log("**req.body: ", req.body);
  const livro = await Livro.update({ título, dtlanc, autor, genero, preco, adap_cinema, nota }, { where: { id: req.params.id } });
  console.log("**livro: ", livro);
  res.redirect('/');
});

router.get('/delete-book/:id', async (req, res) => {
  await Livro.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

module.exports = router;