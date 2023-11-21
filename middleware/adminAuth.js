const jwt = require('jsonwebtoken')

/**
 * Decrypt JWT token
 */
const adminAuth = async (req, res, next) => {
    try {
        const user = jwt.verify(req.headers.token, process.env.JWT_SECRET)

        if(['admin','sadmin'].includes(user.type)||user.email==req.body.email){
            req.user = data
            next()
        }
        else{
            return {error: "Access Denied!!"}
        }

    } catch (err) {
        return { error: "Invalid Token!! Please try logging in again" }
    }
}

module.exports = adminAuth;