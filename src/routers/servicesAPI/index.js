const fs = require('fs').promises;

const getAll = async () => {
  const result = await fs.readFile('./src/talker.json', 'utf-8');
  return JSON.parse(result);
};

const getById = async (id) => {
  const result = JSON.parse(await fs.readFile('./src/talker.json', 'utf-8'));
  return result.find((talker) => talker.id === id);
};

module.exports = {
  getAll,
  getById,
};