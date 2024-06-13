const {
    DataTypes
} = require('sequelize');
const sequelize = require("../../config/sequelize");
const User = require('./User');
const newsCategory = require('./newsCategory');

const News = sequelize.define('news', {
    newsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false
    },
    summary: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    published: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    publishedAt: {
        type: DataTypes.DATE,
        allowNull: true
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    newsCategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            isAlphanumeric: true,
            length: [1, 100]
        },
        references: {
            model: 'newscategories',
            key: 'newsCategoryId'
        }
    }
});

News.belongsTo(User, {
    foreignKey: 'authorId'
});

User.hasMany(News, {
    foreignKey: 'authorId'
});

News.belongsTo(newsCategory, {
    foreignKey: 'newsCategoryId'
});

newsCategory.hasMany(News, {
    foreignKey: 'newsCategoryId'
});


module.exports = News;