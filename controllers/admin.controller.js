const jwt = require('jsonwebtoken')
const { connect } = require('../db/db');


class AdminController {

    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({force:true});
    }

    /**
     * Add  new Admin
     * @param {String} email 
     * @param {String} password 
     * @param {String} name 
     */
    async createAdmin(email,password,name) {
        try {
            const user = await this.db.user.create({
                email,
                password,
                name,
                type:'admin'
            })
            return ({success: "Admin Created"})
        } catch(err){
            console.log(err)
            return ({error:"Create Admin: Internal Server Error"})
        }
    }

    /**
     * Delete Admin
     * @param {String} email 
     * @returns 
     */
    async deleteAdmin(email){
        try{
            const user = await this.db.user.findOne({where:{email}})
            if(user.type === 'admin'){
                await user.destroy()
                return ({success: "Admin Deleted"})
            }else{
                return({warning:"User is not an Admin"})
            }

        }catch(err){
            console.log(err)
            return ({success: "Delete Admin: Internal Server Error"})
        }
    }

    /**
     * Update Admin
     */
    async updateAdmin(email,data){
        try{
            const user = await this.db.user.findOne({where:{email}})
            if(user.type=='admin'){
                await user.update(data)
            }else{
                return ({warning: "User is not an Admin"})
            }
        }catch(err){
            console.log(err)
            return ({error:"Update Admin: Internal Server Error"})
        }
    }

}

module.exports = new AdminController();