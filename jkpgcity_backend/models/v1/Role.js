const {
    DataTypes
} = require('sequelize');
const sequelize = require("../../config/sequelize");


const Role = sequelize.define('role', {
    roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    roleName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isAlpha: true
        }
    }
}, {
    modelName: 'Role',
    tableName: 'roles',
});

module.exports = Role;