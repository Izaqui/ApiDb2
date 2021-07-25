import express, { json as _json } from 'express';
const app = express();
import routes from './routes';
app.use(json());

app.use(_json());

app.use(routes);
const port = 3002;

app.listen(port, ()=>{
    console.log(`App running on port ${port}.`);
});
module.import = { getPeople, addPeople, updatePeople };

app.get('/usuario', getPeople);
app.post('/usuario', addPeople);
app.put('/usuario', updatePeople);
app.delete('/usuario/:email', updatePeople);