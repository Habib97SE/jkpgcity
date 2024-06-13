const sequelize = require('sequelize');

module.exports = new sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'jkpgcity',
    username: 'root',
    password: ''
});