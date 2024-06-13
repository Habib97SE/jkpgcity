const {
    DataTypes
} = require('sequelize');
const sequelize = require("../../config/sequelize");
const Role = require('./Role');

const Permission = sequelize.define('permission', {
    permissionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    permissionName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    permissionDescription: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Role.belongsToMany(Permission, {
    through: 'role_permission',
})
Permission.belongsToMany(Role, {
    through: 'role_permission',
})

module.exports = Permission;