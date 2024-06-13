const {
    DataTypes
} = require('sequelize');
const sequelize = require("../../config/sequelize");
const Venue = require('./Venue');
const User = require('./User');

const VenueNews = sequelize.define('venueNews', {
    venueNewsId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    venueId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authorId: {
        type: DataTypes.INTEGER,
        allowNull: false
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
});

VenueNews.belongsTo(Venue, {
    foreignKey: 'venueId'
});

VenueNews.belongsTo(User, {
    foreignKey: 'authorId'
});

User.hasMany(VenueNews, {
    foreignKey: 'authorId'
});

Venue.hasMany(VenueNews, {
    foreignKey: 'venueId'
});

module.exports = VenueNews;