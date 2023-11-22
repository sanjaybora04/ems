const { connect } = require('../db/db');


class SessionController {

    db = {};

    constructor() {
        this.db = connect();
        // this.db.sequelize.sync({force:true});
    }


    /**
     * Start Session
     */
    async start(email) {                 // Todo: check if a session has already been created; only one session can be created in one day
        try {
            const user = await this.db.user.findOne({ where: { email } })
            const currentSession = await user.getSessions({where:{endTime:null}})
            if(currentSession[0]){
                return ({ warning: "A Session is already active"})
            }else{
                const session = await user.createSession({ startTime: Date.now() })
                await session.setUser(user)
                return ({ success: "Session Started" })
            }
        } catch (err) {
            console.log(err)
            return ({ error: "Start Session: Internal Server Error" })
        }
    }

    /**
     * End Session
     */
    async end(email) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            const session = await user.getSessions({
                where: {            // Todo : find session that was created today
                    endTime: null
                }
            })
            if(session[0]){
                await session[0].update({ endTime: Date.now() })
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
    async pause(email) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            const session = await user.getSessions({
                where: {
                    endTime: null
                }
            })

            if (session[0]) {

                const breaks = [...session[0].breaks]

                if (breaks.length>0) {
                    const lastEntry = breaks[breaks.length-1]

                    if (lastEntry.endTime) {
                        session[0].update({ paused: true, breaks: [...breaks, { startTime: Date.now(), endTime:null }] })
                        return { success: "Session Paused" }
                    } else {
                        return { warning: "Session is already Paused" }
                    }
                } else {
                    session[0].update({ paused: true, breaks: [{ startTime: Date.now(), endTime:null }] })
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

    async resume(email) {
        try {
            const user = await this.db.user.findOne({ where: { email } })
            const session = await user.getSessions({
                where: {
                    endTime: null
                }
            })
            
            if (session[0]) {
                
                const breaks = [...session[0].breaks]

                if (breaks.length>0) {
                    const lastEntry = breaks[breaks.length-1]

                    if (lastEntry.endTime) {
                        return { warning: "Session is already active" }
                    } else {
                        // console.log(breaks)
                        breaks[breaks.length - 1].endTime = Date.now()
                        session[0].update({ paused: false, breaks })
                        return { success: "Session resumed" }
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

module.exports = new SessionController();