const { connect } = require('../db/db');

class ProjectController {

    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({force:true});
    }

    /**
     * Create Project
     */
    async create(title,description) {
        try {
            await this.db.project.create(title,description)
            return { success: "Project Created" }
        } catch (err) {
            console.log(err)
            return ({ error: "Create Project: Internal Server Error" })
        }
    }

    /**
     * Delete Project
     */
    async delete(id) {
        try {
            const project = await this.db.project.findByPk(id)
            await project.destroy()
            return { success: 'Project Deleted' }
        } catch (err) {
            console.log(err)
            return { error: "Delete Project: Internal Server Error" }
        }
    }

    /**
     * Update Project
     */
    async update(id, data) {
        try {
            const project = await this.db.project.findByPk(id)
            await project.update(data)
            return { success: 'Project updated' }
        } catch (err) {
            console.log(err)
            return { error: "Update Project: Internal Server Error" }
        }
    }

    /**
     * Assign Project to an employee
     */
    async assign(id, email){
        try{
            const project = await this.db.project.findByPk(id)
            const user = await this.db.user.findOne({wher:{email}})
            if(user.type=="employee"){
                await project.addEmployee(user)
                await user.addProject(project)
                return {success: "Employee assigned to project"}
            }else{
                return {error: "Only employees can be assigned to a project"}
            }
        }catch(err){
            console.log(err)
            return {error: "Assign Project: Internal Server Error"}
        }
    }

}

module.exports = new ProjectController();