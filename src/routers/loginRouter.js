const express = require('express');

const router = express.Router();

router.use(express.json());

const checkEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email || email.length === 0) {
    res.status(400).json({ message: 'O campo "email" é obrigatório' });
  } else if (!email.includes('@') || !email.endsWith('.com')) {
    res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } else {
    next();
  }
};

const checkPassword = (req, res, next) => {
  const { password } = req.body;
  if (!password || password.length === 0) {
    res.status(400).json({ message: 'O campo "password" é obrigatório' });
  } else if (password.length < 6) {
    res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  } else {
    next();
  }
};

router.post('/', checkEmail, checkPassword, (req, res) => {
  try {
    const result = Object.keys(req.body);
    if (result.length === 2) return res.status(200).json({ token: '7mqaVRXJSp886CGr' });
    return res.status(400).json({ message: 'Objeto deve possuir apenas email e password' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

module.exports = router;