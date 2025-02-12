const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();
const path = "layouts/usuario";

// Rotas principais


// GET | rota para views/layout/usuario/index.handlebars
router.get("/user", async (req, res) => {
  let Usuarios = await Usuario.findAll();
  //Usuarios = Usuarios.map((Usuario) => Usuario.dataValues);
  const usuariosData = Usuarios.map(user => user.get({ plain: true }))
  console.log(Usuarios);
  res.render(path + '/index', { Usuario : usuariosData });
}); // funciona | testado


// GET | rota para views/layout/usuario/create.handlebars
router.get('/user/create', (req, res) => {
  res.render(path + '/create');
}); // funciona | testado


// POST | rota para views/layout/usuario/create.handlebars
router.post('/user/create', async (req, res) => {
  console.log(req.body);
  const { nome, email, senha, pontos, tempo_lid } = req.body;
  
  /*
  console.log("Nome:", nome);
  console.log("Email:", email);
  console.log("Senha:", senha);
  console.log("Pontos:", pontos);
  console.log("Tempo Lido:", tempo_lid);
  */

  const newUser = await Usuario.create({ nome, email, senha, pontos, tempo_lid });
    
  //console.log("New User", newUser);
  
  res.redirect('/');
}); // funciona | testado


// GET | rota para views/layout/usuario/edit.handlebars
router.get('/user/edit/:id', async (req, res) => {
  let usuario = await Usuario.findByPk(req.params.id);
  usuario = usuario.dataValues;
  
  res.render(path + '/edit', { usuario });
}); // não sei se funciona | não testado


// POST | rota para views/layout/usuario/edit.handlebars
router.post('/user/edit/:id', async (req, res) => {
  const { nome, email, senha, pontos, tempo_lid } = req.body;
  await Usuario.update({ nome, email, senha, pontos, tempo_lid }, { where: { id: req.params.id } });
  res.redirect('/');
});


// ARQUIVO INEXISTENTE
// GET | rota para views/layout/usuario/delete.handlebars
router.get('/user/delete/:id', async (req, res) => {
  console.log("ID: ", req.params.id)
  await Usuario.destroy({ where: { id: req.params.id } });
  res.redirect('/');
});

router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;