// routes/signup.js
var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var db = require('../routes/db');

router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', async function(req, res, next) {
  try {
    const { username, phone, password, confirmPassword  } = req.body;
     // Verifica se a senha e a confirmação de senha correspondem
    if (password !== confirmPassword) {
      return res.render('signup', { error: 'A senha e a confirmação de senha não correspondem' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const usersCollection = db.getDB().collection('users');

    // Verifica se o nome de usuário já existe
    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
      return res.render('signup', { error: 'Nome de usuário já em uso' });
    }

    // Cria o novo usuário
    const newUser = {
      username,
      phone,
      password: hashedPassword,
    };
    await usersCollection.insertOne(newUser);

    // Redireciona para a página de login
    res.redirect('/signin');
  } catch (error) {
    console.error('Erro no registro', error);
    next(error);
  }
});

module.exports = router;
