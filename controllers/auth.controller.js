const jwt = require('jsonwebtoken')
const { connect } = require('../db/db');


class AuthController {

    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({force:true});
    }

    /**
     * Signin
     */
    async signin(email, password) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            if (user.password === password) {
                const token = jwt.sign({
                    email: user.email,
                    name: user.name,
                    type: user.type
                }, process.env.JWT_SECRET, { expiresIn: "24d" })
                return ({ token })
            }
        } catch (err) {
            console.log(err)
            return ({ error: "Internal Server Error" })
        }
    }

    /**
     * superAdmin Signin 
     */
    async sAdminSignin() {
        const token = jwt.sign({
            email: 'sadmin',
            name: 'Super Admin',
            type: 'sadmin'
        }, process.env.JWT_SECRET, {expiresIn: '24d'})
        return ({ token })
    }

    /**
     * get User data by email
     */
    async getUser(email) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            return user
        } catch (err) {
            console.log(err)
            return new Promise((resolve, reject) => reject(new Error("Error: Get User")))
        }
    }

}

module.exports = new AuthController();