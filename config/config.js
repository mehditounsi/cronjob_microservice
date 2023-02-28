const dotenv = require('dotenv');

dotenv.config();

const env = {
    database: {
        db: process.env.DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    logs: {
        console: process.env.LOG_CONSOLE,
        console_level: process.env.LOG_CONSOLE_LEVEL,
        file: process.env.LOG_FILE,
        file_level: process.env.LOG_FILE_LEVEL,
        file_path: process.env.LOG_FILE_PATH,
        knex: process.env.LOG_KNEX
    },
    url: {
        societe_url: process.env.SOCIETE_URL
    }
}


module.exports = env;