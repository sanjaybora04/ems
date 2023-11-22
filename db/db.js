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
    db.session = require("./models/session.model")(sequelize, DataTypes, Model)
    db.project = require("./models/project.model")(sequelize, DataTypes, Model)

    // Relationships
    db.user.hasMany(db.session,{as:"Sessions"})
    db.session.belongsTo(db.user,{as:"User"})

    db.user.belongsToMany(db.project,{through:"userProject",as:'Projects'})
    db.project.belongsToMany(db.user,{through:"userProject",as:'Employees'})
    
    return db;
}

module.exports = {
    connect
}