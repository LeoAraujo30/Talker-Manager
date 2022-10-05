const express = require('express');
const { getAll, getById, addTalker, updateTalker, removeTalker } = require('./servicesAPI');

const router = express.Router();

router.use(express.json());

const checkToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    res.status(401).json({ message: 'Token não encontrado' });
  } else if (authorization.length !== 16) {
    res.status(401).json({ message: 'Token inválido' });
  } else {
    next();
  }
};

const checkName = (req, res, next) => {
  const { name } = req.body;
  if (!name || name.length === 0) {
    res.status(400).json({ message: 'O campo "name" é obrigatório' });
  } else if (name.length < 3) {
    res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  } else {
    next();
  }
};

const checkAge = (req, res, next) => {
  const { age } = req.body;
  if (!age || age <= 0) {
    res.status(400).json({ message: 'O campo "age" é obrigatório' });
  } else if (age < 18 || (age.toString()).includes('.')) {
    res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  } else {
    next();
  }
};

const checkTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  } else {
    next();
  }
};

const checkWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  if (!watchedAt || watchedAt.length === 0) {
    res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  } else if (watchedAt[2] !== '/' || watchedAt[5] !== '/') {
    res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  } else {
    next();
  }
};

const checkRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (typeof rate !== 'number') {
    res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  } else if (rate > 5 || rate <= 0) {
    res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  } else {
    next();
  }
};

router.get('/', async (req, res) => {
  try {
    const result = await getAll();
    if (result.length > 0) return res.status(200).json(result);
    return res.status(200).json([]);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await getById(Number(id));
    if (result) return res.status(200).json(result);
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.post('/', checkToken, checkName, checkAge, checkTalk,
  checkWatchedAt, checkRate, async (req, res) => {
  try {
    if (Object.keys(req.body).length === 3) {
      const result = await addTalker(req.body);
      res.status(201).json(result);
    } else {
      res.status(404).json({ message: 'O Objeto deve possuir apenas name, age e talk' });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.put('/:id', checkToken, checkName, checkAge, checkTalk,
  checkWatchedAt, checkRate, async (req, res) => {
  try {
    if (Object.keys(req.body).length === 3) {
      const { id } = req.params;
      const result = await updateTalker(Number(id), req.body);
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'O Objeto deve possuir apenas name, age e talk' });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

router.delete('/:id', checkToken, async (req, res) => {
  try {
    const { id } = req.params;
    await removeTalker(Number(id));
    res.status(204).end();
  } catch (error) {
    res.status(500).send({ message: 'id invalido' });
  }
});

module.exports = router;