const jwt = require('jsonwebtoken')
const { connect } = require('../db/db');


class UserController {

    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({force:true});
    }

    /**
     * Signin
     */
    async signin(email,password) {
        try {
            const user = await this.db.user.findOne({where:{email}})
            if(user.password === password){
                const token = jwt.sign({
                    email:user.email,
                    name: user.name,
                    type: user.type
                },process.env.JWT_SECRET,{expiresIn:"24d"})
                return ({token})
            }
        } catch(err){
            console.log(err)
            return ({error:"Internal Server Error"})
        }
    }

    /**
     * superAdmin Signin 
     */
    async sAdminSignin(email,password){
        if(email==="sadmin"&&password=="sadmin"){
            const token = jwt.sign({
                email,
                name: 'Super Admin',
                type: 'sadmin'
            })
            return ({token})
        }else{
            return ({error:"Incorrect Credentials"})
        }
    }

    /**
     * get User data by email
     */
    async getUser(email) {
        try{
            const user = await this.db.user.findOne({where:{email}})
            return user
        }catch(err){
            console.log(err)
            return new Promise((resolve,reject)=>reject(new Error("Error: Get User")))
        }
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

    /**
     * Add  new employee
     * @param {String} email 
     * @param {String} password 
     * @param {String} name 
     */
    async createEmployee(email,password,name) {
        try {
            const user = await this.db.user.create({
                email,
                password,
                name,
                type:'employee'
            })
            return ({success: "Employee Created"})
        } catch(err){
            console.log(err)
            return ({error:"Create Employee: Internal Server Error"})
        }
    }

    /**
     * Delete Employee
     * @param {String} email 
     * @returns 
     */
    async deleteEmployee(email){
        try{
            const user = await this.db.user.findOne({where:{email}})
            if(user.type === 'employee'){
                await user.destroy()
                return ({success: "Employee Deleted"})
            }
            else{
                return ({warning: "User is not an Employee"})
            }
        }catch(err){
            console.log(err)
            return ({success: "Delete Employee: Internal Server Error"})
        }
    }

    /**
     * Update Employee
     */
    async updateEmployee(email,data){
        try{
            const user = await this.db.user.findOne({where:{email}})
            if(user.type === 'employee'){
                await user.update(data)
            }else{
                return ({warning: "User is not an Employee"})
            }
        }catch(err){
            console.log(err)
            return ({error:"Update Admin: Internal Server Error"})
        }
    }

}

module.exports = new UserController();