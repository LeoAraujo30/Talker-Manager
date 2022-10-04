const fs = require('fs').promises;

const getAll = async () => {
  const result = await fs.readFile('./src/talker.json', 'utf-8');
  return JSON.parse(result);
};

module.exports = {
  getAll,
};