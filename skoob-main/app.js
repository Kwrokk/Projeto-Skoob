const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const sequelize = require('./database');
const Livro = require('./models/Livros');
const Usuario = require('./models/Usuario');
const path = require("path");
const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');



sequelize.sync({ force: false }).then(() => {
  console.log('Database Conectado!');
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));


const usuarioRoutes = require('./controller/UsuarioController');
app.use("/", usuarioRoutes);

const livroRoutes = require('./controller/LivroController');
app.use("/", livroRoutes);

const publicacaoRoutes = require('./controller/PublicacaoController');
app.use("/", publicacaoRoutes);

// Rotas principais
app.get('/', async (req, res) => {
  res.render('index');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor local em: http://localhost:${PORT}`);
});
