const {
    DataTypes,
    Model
} = require('sequelize');
const sequelize = require("../../config/sequelize");
const Role = require('./Role');


const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        },
        unique: {
            msg: "Email already exists"
        }
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isPhone: true
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Role,
            key: 'roleId'
        }
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: true
    },
    facebook: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    twitter: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },
    instagram: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isUrl: true
        }
    },

}, {
    modelName: 'User',
    tableName: 'users'
});


// Establish relationship between User and Role models. 
User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'role'
});
Role.hasMany(User, {
    foreignKey: 'roleId',
    as: 'users'
});

module.exports = User;