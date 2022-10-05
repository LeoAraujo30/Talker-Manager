const fs = require('fs').promises;

const dataBase = './src/talker.json';

const getAll = async () => {
  const result = await fs.readFile(dataBase, 'utf-8');
  return JSON.parse(result);
};

const getById = async (id) => {
  const result = JSON.parse(await fs.readFile(dataBase, 'utf-8'));
  return result.find((talker) => talker.id === id);
};

const addTalker = async (obj) => {
  const oldResult = JSON.parse(await fs.readFile(dataBase, 'utf-8'));
  const id = oldResult[oldResult.length - 1].id + 1;
  const newResult = [...oldResult, { id, ...obj }];
  await fs.writeFile(dataBase, JSON.stringify(newResult));
  return { id, ...obj };
};

const updateTalker = async (id, obj) => {
  const oldResult = JSON.parse(await fs.readFile(dataBase, 'utf-8'));
  const newResult = oldResult.map((talker) => {
    if (talker.id === id) return { id, ...obj };
    return talker;
  });
  await fs.writeFile(dataBase, JSON.stringify(newResult));
  return { id, ...obj };
};

const removeTalker = async (id) => {
  const oldResult = JSON.parse(await fs.readFile(dataBase, 'utf-8'));
  const newResult = oldResult.filter((talker) => talker.id !== id);
  await fs.writeFile(dataBase, JSON.stringify(newResult));
};

module.exports = {
  getAll,
  getById,
  addTalker,
  updateTalker,
  removeTalker,
};