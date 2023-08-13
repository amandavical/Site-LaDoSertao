var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../routes/db');

router.get('/', function(req, res, next) {
  res.render('signin', { error: req.flash('error')[0] });
});

router.post('/', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    const usersCollection = db.getDB().collection('users');

    // Verifica se o usuário existe
    const user = await usersCollection.findOne({ username });
    if (!user) {
      req.flash('error', 'Nome de usuário ou senha inválidos');
      return res.redirect('/signin');
    }

    // Verifica a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      req.flash('error', 'Nome de usuário ou senha inválidos');
      return res.redirect('/signin');
    }

    // Login bem-sucedido
    // Você pode fazer algo como salvar o usuário na sessão aqui
 // Armazena o nome de usuário na sessão
    req.session.username = username;
    
    res.redirect('/'); // Redireciona para a página principal após o login
  } catch (error) {
    console.error('Erro no login', error);
    next(error);
  }
});

module.exports = router;
