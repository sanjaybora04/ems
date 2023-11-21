require('dotenv').config()
const { Sequelize, Model, DataTypes } = require("sequelize");
const pg = require('pg');

const connect = () => {

    const sequelize = new Sequelize(process.env.PG_CONNECTION_STR, {
        dialectModule: pg,
        // logging: false
    });

    const db = {};
    db.Sequelize = Sequelize;
    db.sequelize = sequelize;

    db.user = require("./models/user.model")(sequelize, DataTypes, Model);

    // Relationships
    // db.user.hasMany(db.trip,{as:"MyTrips"})
    // db.trip.belongsTo(db.user,{as:"Leader"})

    // db.trip.belongsToMany(db.user,{through:'tripMember',as:"Members"})
    // db.user.belongsToMany(db.trip,{through:'tripMember',as:"Trips"})

    // db.trip.hasMany(db.stops,{as:'Stops'})
    // db.stops.belongsTo(db.trip)
    
    return db;
}

module.exports = {
    connect
}