require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    { useUnifiedTopology: true });
module.exports = {
    async getPeople(){
        try{
            await client.connect();
            const database = client.db(`${process.env.MONGO_DATABASE}`);
            const pessoas = database.collection('Pessoa');

            const filter = {idade: {$gt: 20}};
            await pessoas.find().forEach(p => console.log(p));
        } finally{
            await client.close();
        }
    },

    async addPeople(obj){
        try{
            await client.connect();
            const pessoas = client.db(`${process.env.MONGO_DATABASE}`).collection('Pessoa');

            await pessoas.insertOne(obj).then(console.log('Inserido!'));
        }finally{
            await client.close();
        }
    },

    async updatePeople(){
        try{
            await client.connect();
            const pessoas = client.db(`${process.env.MONGO_DATABASE}`).collection('Pessoa');

            const query = {nome: "Paulo Freitas"};
            const update = {$set: {nome: "Francisco Paulo de Freitas Neto"}};
            await pessoas.updateOne(query, update).then(console.log('Atualizado!'));
        }finally{
            await client.close();
        }
    },

    async deletePeople(filter){
        try{
            await client.connect();
            const pessoas = client.db(`${process.env.MONGO_DATABASE}`).collection('Pessoa');

            const result = await pessoas.deleteOne(filter);
            console.log(`${result.deletedCount} documentos removidos`);
        }finally{
            await client.close();
        }
    },

};