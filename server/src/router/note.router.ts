import Router from 'express'
import UserModel from '../models/user'
import { ObjectId } from "mongodb";

import { Note,User } from '../models/interfaces';

const routerNote = Router();

routerNote.get('/notes', (req, res) => {
    UserModel.find()
        .then((users: User[]) => {
            const notes: Note[] = [];

            users.forEach((user: User) => {
                user.notes.forEach((note: Note) => {
                    // Agregar el ID del usuario a cada nota
                    const noteWithUserId: Note = { ...note, userId: user._id };
                    notes.push(noteWithUserId);
                });
            });

            res.status(200).send(notes);
        })
        .catch((error) => {
            console.error('Error al obtener las notas:', error);
            res.status(500).send('Error al obtener las notas');
        });
});

routerNote.get('/note/:id', (req, res) => {
    res.send('Devuelve una nota por un id')
})

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