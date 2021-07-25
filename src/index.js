const express = require('express');
const app = express();
const routes = require('./routes');
app.use(express.json());

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