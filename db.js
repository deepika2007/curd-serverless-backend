const { Client } = require('pg');

const getClient = () => {
    return new Client({
        host: process.env.RDS_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 5432,
        ssl: { require: true, rejectUnauthorized: false }, // Use SSL if required
    });
};

module.exports = getClient;
