import Router from 'express'
import UserModel from '../models/user'
import {Note} from "../interfaces/note"
import { User } from "../interfaces/user";
import { getNotesForUserHandler } from '../controllers/noteController';
import { getAllNotes } from '../services/noteServices';


const routerNote = Router();

routerNote.get('/notes', getAllNotes)

routerNote.get('/user/notes', getNotesForUserHandler);

routerNote.get('/note/:id/history', (req, res) => {
    res.send('Devuelve el historial de una nota por un id')
})

routerNote.put('/note/:id', (req, res) => {
    res.send('Actualiza una nota por un id')
})

routerNote.delete('/note/:id', (req, res) => {
    res.send('Elimina una nota por un id')
})

routerNote.get('/note/:id/history', (req, res) => {
    res.send('Devuelve el historial de una nota por un id')
})

routerNote.get('/note/:id/history', (req, res) => {
    res.send('Devuelve el historial de una nota por un id')
})

routerNote.post('/note', (req, res) => {
    res.send('Crea una nota')
})