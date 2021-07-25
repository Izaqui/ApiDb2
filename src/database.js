require('dotenv').config();
import { MongoClient } from 'mongodb';

const client = new MongoClient(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
    { useUnifiedTopology: true });
export async function getPeople() {
    try {
        await client.connect();
        const database = client.db(`${process.env.MONGO_DATABASE}`);
        const users = database.collection('User');

        const filter = { idade: { $gt: 20 } };
        await users.find().forEach(p => console.log(p));
    } finally {
        await client.close();
    }
}
export async function addPeople(obj) {
    try {
        await client.connect();
        const users = client.db(`${process.env.MONGO_DATABASE}`).collection('User');

        await users.insertOne(obj).then(console.log('Inserido!'));
    } finally {
        await client.close();
    }
}
export async function updatePeople() {
    try {
        await client.connect();
        const users = client.db(`${process.env.MONGO_DATABASE}`).collection('User');
        await users.updateOne(query, update).then(console.log('Atualizado!'));
    } finally {
        await client.close();
    }
}
export async function deletePeople(filter) {
    try {
        await client.connect();
        const users = client.db(`${process.env.MONGO_DATABASE}`).collection('User');

        const result = await users.deletePeople(filter);
        console.log(`${result.deletedCount} documentos removidos`);
    } finally {
        await client.close();
    }
}
module.exports = {
    getPeople,
    addPeople,
    updatePeople,
    deletePeople
};