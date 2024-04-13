
# BASE DE DATOS

La aplicación Note Manager almacenará todos los datos en una base de datos MongoDB.

## Colecciones

### note_history (Historial de notas modificadas)

Las notas no se eliminarán permanentemente de la base de datos al ser actualizadas. En su lugar, se guardará un historial de cambios con un límite máximo de versiones. Esto permitirá a los usuarios revertir a versiones anteriores si es necesario, proporcionando un control de versiones de las notas.

Si una nota se elimina, su estado se cambiará a "inactive" y se enviará al historial de notas. Si una nota se modifica, su estado se cambiará a "replaced".

```JSON
note_history :
{
    id: ObjectID(),
    note_id: ObjectID(),
    changes: {
        // Detalles de los cambios realizados en la nota
    },
    state: 'active' | 'inactive' | 'replaced',
    createAt: Date,
    UpdateAt: Date,
    user_id: ObjectID()
},
{
    id: ObjectID(),
    note_id: ObjectID(),
    changes: {
        // Detalles de los cambios realizados en la nota
    },
    state: 'active' | 'inactive' | 'replaced',
    createAt: Date,
    UpdateAt: Date,
    user_id: ObjectID()
},

// Otras notas
```

### user

```JSON
user :
{
    id: ObjectID(),
    nick: string (máximo 100 caracteres, único),
    email: string (único, hash),
    password: string (hash),
    profile_picture: string (URL de la foto de perfil),
    description: string (descripción del usuario),
    notes: [
        {
            id: ObjectID(),
            title: string (máximo 100 caracteres),
            content: string (sin límite),
            label: [etq1, etq2, ...],
            state: 'active' | 'inactive' | 'replaced',
            createAt: Date,
            UpdateAt: última actualización,
        }
    // Otras notas

    ],
    friends: [id_usuario, id_usuario, ...],
    state: 'active' | 'inactive' | 'block',
    createAt: Date,
    UpdateAt: Date (última actualización),
}
```

### user_history (Historial de usuarios modificados)

El historial de usuarios registra todas las modificaciones realizadas en los perfiles de usuario. Cada vez que se actualiza el perfil de un usuario, se crea una entrada en el historial de usuarios con los detalles de los cambios realizados. La fecha de creación (createAt) nunca cambia después de la primera inserción, mientras que la fecha de última actualización (UpdateAt) se actualiza con cada modificación.

```JSON
user_history :
{
    id: ObjectID(),
    user_id: ObjectID(),
    changes: {
        // Detalles de los cambios realizados en el perfil del usuario
    },
    createAt: Date,
    UpdateAt: Date (última actualización)
},
{
    id: ObjectID(),
    user_id: ObjectID(),
    changes: {
        // Detalles de los cambios realizados en el perfil del usuario
    },
    createAt: Date,
    UpdateAt: Date (última actualización)
},
// Otros registros de historial de usuarios
```

Esta estructura modifica la colección `note_history` para que guarde solo los campos que se han cambiado de cada nota, lo que puede ayudar a reducir la redundancia de datos y mejorar la eficiencia en el almacenamiento.