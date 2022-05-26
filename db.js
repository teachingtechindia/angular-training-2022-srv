const lowDb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const movieList = require("./backups/movies.json");

const adapter = new FileSync("db.json");
const db = lowDb(adapter);
db.defaults({ users: [], movies: movieList }).write();

module.exports = db;
