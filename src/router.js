//const express = require('express');
import express, { json as _json } from 'express';

import { getPeople, addPeople, deletePeople } from './User';
const connection = require('./database');
const routes = Router();

routes.get('/usuario', getPeople);
routes.post('/usuario', addPeople);
routes.delete('usuario/:email', deletePeople);


export default routes;