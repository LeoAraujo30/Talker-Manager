const express = require('express');
const { getAll, getById } = require('./servicesAPI');

const router = express.Router();

router.use(express.json());

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

module.exports = router;