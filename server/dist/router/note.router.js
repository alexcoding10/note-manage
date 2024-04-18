"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routerNote = (0, express_1.default)();
routerNote.get('/notes', (req, res) => {
    res.send('Devuelve todas las notas');
});
routerNote.get('/note/:id', (req, res) => {
    res.send('Devuelve una nota por un id');
});
routerNote.get('/note/:id/history', (req, res) => {
    res.send('Devuelve el historial de una nota por un id');
});
routerNote.put('/note/:id', (req, res) => {
    res.send('Actualiza una nota por un id');
});
routerNote.delete('/note/:id', (req, res) => {
    res.send('Elimina una nota por un id');
});
routerNote.get('/note/:id/history', (req, res) => {
    res.send('Devuelve el historial de una nota por un id');
});
routerNote.get('/note/:id/history', (req, res) => {
    res.send('Devuelve el historial de una nota por un id');
});
routerNote.post('/note', (req, res) => {
    res.send('Crea una nota');
});
