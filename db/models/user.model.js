module.exports = (sequelize, DataTypes, Model) => {

    class Users extends Model { }

    Users.init({
        // Model attributes are defined here
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }      
    }, {
        // Other model options go here
        sequelize, // We need to pass the connection instance
        modelName: 'users' // We need to choose the model name
    });

    return Users;
}