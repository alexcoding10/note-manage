import dotenv from 'dotenv';
dotenv.config();

export const config = {
    development:{
        username: 'root',
        password: process.env.MYSQL_PASSWORD,
        database: 'note_manager',
        host: 'localhost',
        dialect:'mysql',
        port:3306
    }
}