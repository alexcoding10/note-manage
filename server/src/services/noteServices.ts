import { Note } from '../interfaces/note';
import { User } from '../interfaces/user';
import NoteHistoryModel from '../models/NoteHistory';
import { StatusNote } from '../models/enums';
import UserModel from '../models/user';


export const getNotesForUser = async (userName: string): Promise<Note[]> => {
    const user = await UserModel.findOne({ name: userName });

    if (!user) {
        throw new Error('No se encontró ningún usuario con ese nombre');
    }

    const notes: Note[] = [];

    for (const note of user.notes) {
        if (note.status === StatusNote.Active) {
            const noteHistory = await NoteHistoryModel.findOne({ noteId: note._id, userId: user._id });

            if (!noteHistory) {
                notes.push(note);
            } else {
                const lastChange = noteHistory.changes[noteHistory.changes.length - 1];
                const noteWithLastChange: Note = {
                    ...note,
                    title: lastChange.title,
                    content: lastChange.content,
                    label: lastChange.label,
                    status: lastChange.status,
                    updateAt: lastChange.updateAt
                };
                notes.push(noteWithLastChange);
            }
        }
    }

    return notes;
};


export const getAllNotes = async (users: User[]): Promise<Note[]> => {
    const notes: Note[] = [];

    // Iterar sobre cada usuario
    for (const user of users) {
        // Obtener las notas del usuario
        const notesForUser = await getNotesForUser(user.name);
        
        // Agregar el ID del usuario a cada nota y agregarlas al arreglo de notas
        notesForUser.forEach((note: Note) => {
            const noteWithUserId: Note = { ...note, userId: user._id };
            notes.push(noteWithUserId);
        });
    }

    return notes;
}
