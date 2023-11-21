module.exports = (sequelize, DataTypes, Model) => {

    class Sessions extends Model { }

    Sessions.init({
        // Model attributes are defined here
        startTime:{
            type: DataTypes.DATE,
            allowNull:false
        },
        breaks:{
            type: DataTypes.ARRAY(DataTypes.JSON)
        },
        paused:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        endTime:{
            type: DataTypes.DATE
        },
        data:{
            type: DataTypes.TEXT,
        }      
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'sessions' // We need to choose the model name
    });

    return Sessions;
}