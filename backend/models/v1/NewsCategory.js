const {
    DataTypes
} = require('sequelize');
const sequelize = require("../../config/sequelize");

const NewsCategory = sequelize.define('newsCategory', {
    newsCategoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
            length: [1, 100]
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isAlphanumeric: true,
            length: [1, 500]
        }
    }
});

module.exports = NewsCategory;