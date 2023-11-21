const { connect } = require('../db/db');


class EmployeeController {

    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({force:true});
    }

    /**
     * Add  new employee
     * @param {String} email 
     * @param {String} password 
     * @param {String} name 
     */
    async createEmployee(email, password, name) {
        try {
            const user = await this.db.user.create({
                email,
                password,
                name,
                type: 'employee'
            })
            return ({ success: "Employee Created" })
        } catch (err) {
            console.log(err)
            return ({ error: "Create Employee: Internal Server Error" })
        }
    }

    /**
     * Delete Employee
     * @param {String} email 
     * @returns 
     */
    async deleteEmployee(email) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            if (user.type === 'employee') {
                await user.destroy()
                return ({ success: "Employee Deleted" })
            }
            else {
                return ({ warning: "User is not an Employee" })
            }
        } catch (err) {
            console.log(err)
            return ({ success: "Delete Employee: Internal Server Error" })
        }
    }

    /**
     * Update Employee
     */
    async updateEmployee(email, data) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            if (user.type === 'employee') {
                await user.update(data)
            } else {
                return ({ warning: "User is not an Employee" })
            }
        } catch (err) {
            console.log(err)
            return ({ error: "Update Admin: Internal Server Error" })
        }
    }

    /**
     * Start Session
     */
    async startSession(email) {                 // Todo: check if a session has already been created; only one session can be created in one day
        try {
            const user = await this.db.user.findOne({ where: { email } })
            const session = await user.createSession({ startTime: Date.now() })
            await session.setUser(user)
            return ({ success: "Session Started" })
        } catch (err) {
            console.log(err)
            return ({ error: "Start Session: Internal Server Error" })
        }
    }

    /**
     * End Session
     */
    async endSession(email, data) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            const session = await user.getSessions({
                where: {            // Todo : find session that was created today
                    data: null
                }
            })
            if(session[0]){
                await session[0].update({ endTime: Date.now(), data })
            }else{
                return {error: "Session hasn't been started yet"}
            }
        } catch (err) {
            console.log(err)
            return { error: "End Session: Internal Server Error" }
        }
    }

    /**
     * Pause Session
     */
    async pauseSession(email) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            const session = await user.getSessions({
                where: {
                    data: null
                }
            })

            if (session[0]) {

                const breaks = [...session[0].breaks]

                if (breaks) {
                    const lastEntry = breaks.pop()

                    if (lastEntry.endTime) {
                        session[0].update({ paused: true, breaks: [...breaks, { startTime: Date.now() }] })
                        return { success: "Session Paused" }
                    } else {
                        return { warning: "Session is already Paused" }
                        // breaks[breaks.length-1].endTime = Date.now()
                        // session[0].update({paused:true,breaks:[...breaks]})
                    }
                } else {
                    session[0].update({ paused: true, breaks: [{ startTime: Date.now() }] })
                    return { success: "Session Paused" }
                }
            } else {
                return { error: "Session hasn't been started yet" }
            }
        } catch (err) {
            console.log(err)
            return { error: "Pause Session: Internal Server Error" }
        }
    }

    async resumeSession(email) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            const session = await user.getSessions({
                where: {
                    data: null
                }
            })

            if (session[0]) {

                const breaks = [...session[0].breaks]

                if (breaks) {
                    const lastEntry = breaks.pop()

                    if (lastEntry.endTime) {
                        return { warning: "Session is already active" }
                    } else {
                        breaks[breaks.length - 1].endTime = Date.now()
                        session[0].update({ paused: false, breaks: [...breaks] })
                        return { warning: "Session is already Paused" }
                    }
                } else {
                    return { warning: "Session is already active" }
                }
            } else {
                return { error: "Session hasn't been started yet" }
            }
        } catch (err) {
            console.log(err)
            return { error: 'Resume Session: Internal Server Error' }
        }
    }

}

module.exports = new EmployeeController();