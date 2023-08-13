// db.js
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://amandavical:Belovendg5@pw.mq7nxvr.mongodb.net/'; // Atualize com sua URL do MongoDB
const dbName = 'people'; // Atualize com o nome do seu banco de dados

let db = null;

async function connectToDB() {
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    db = client.db(dbName);
    console.log('Conectado ao banco de dados MongoDB');
  } catch (error) {
    console.error('Erro ao conectar ao banco de dados MongoDB', error);
  }
}

function getDB() {
  return db;
}

module.exports = {
  connectToDB,
  getDB,
};
