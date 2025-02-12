const express = require('express');
const Publicacao = require('../models/Publicacoes');
const path = "layouts/publicacoes";
const router = express.Router();


// Rotas principais
router.get('/publication', async (req, res) => {
  let publications = await Publicacao.findAll();
  const publicationsData = publications.map(publication => publication.get({ plain: true }))
  console.log(publications);
  res.render(path + '/index', { publication : publicationsData });
});

router.get('/create-publication', (req, res) => {
  res.render(path + '/create');
});

router.post('/create-publication', async (req, res) => {
  const { titulo, descricao, autor, tema } = req.body;
  console.log("**req.body: ", req.body);
  const publicacao = await Publicacao.create({ titulo, descricao, autor, tema });
  console.log(publicacao);
  res.redirect('/');
});

router.get('/edit-publication/:id', async (req, res) => {
  let publicacao = await Publicacao.findByPk(req.params.id);
  publicacao = publicacao.dataValues;
  
  res.render(path + '/edit', { publicacao });
});

router.post('/edit-publication/:id', async (req, res) => {
  const { titulo, descricao, autor, tema } = req.body;
  console.log("**req.body: ", req.body);
  const publicao = await Publicacao.update({ titulo, descricao, autor, tema }, { where: { id: req.params.id } });
  console.log("**publicao: ", publicao);
  res.redirect('/');
});

router.get('/delete-publication/:id', async (req, res) => {
  await Publicacao.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

module.exports = router;