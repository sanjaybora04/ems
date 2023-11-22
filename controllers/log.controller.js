const { connect } = require('../db/db');


class LogController {

    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({force:true});
    }

    

}

module.exports = new LogController();