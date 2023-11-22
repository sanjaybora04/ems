module.exports = (sequelize, DataTypes, Model) => {

    class Session extends Model { }

    Session.init({
        // Model attributes are defined here
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
            primaryKey: true
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false
        },
        breaks: {
            type: DataTypes.TEXT,
            get: function () {
                return JSON.parse(this.getDataValue('breaks'));
            },
            set: function (val) {
                return this.setDataValue('breaks', JSON.stringify(val));
            },
            defaultValue: '[]'
        },
        paused: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        endTime: {
            type: DataTypes.DATE
        }
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'sessions' // We need to choose the model name
    });

    return Session;
}