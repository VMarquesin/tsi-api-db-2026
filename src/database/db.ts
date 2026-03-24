import sqlite3 from "sqlite3";

sqlite3.verbose();

export const db = new sqlite3.Database(
    "./database.sqlite", 
    (erro) => {
        if (erro) {
            console.error("Erro ao conectar ao banco de dados.");
        } else {
            console.log("Conexão com o banco de dados estabelecida com sucesso");
        }
    }
);

db.serialize(() => {
    db.run(`
            CREATE TABLE IF NOT EXISTS generos(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL
            )
        `);

});