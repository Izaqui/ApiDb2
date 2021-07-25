import { Router } from 'express';

import { getPeople, addPeople, deletePeople } from './User';

const routes = Router();

routes.get('/usuario', getPeople);
routes.post('/usuario', addPeople);
routes.delete('usuario/:email', deletePeople);


export default routes;