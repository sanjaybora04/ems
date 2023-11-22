const { STRING } = require("sequelize");

module.exports = (sequelize, DataTypes, Model) => {

    class Project extends Model { }

    Project.init({
        // Model attributes are defined here
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        title:{
            type: STRING,
            allowNull: false
        },
        description:{
            type: STRING
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'projects' // We need to choose the model name
    });

    return Project;
}