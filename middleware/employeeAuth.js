const jwt = require('jsonwebtoken')

/**
 * Decrypt JWT token
 */
const employeeAuth = async (req, res, next) => {
    try {
        const user = jwt.verify(req.headers.token, process.env.JWT_SECRET)

        if(user.type=='employee'){
            req.user = user
            next()
        }
        else{
            return {error: "Access Denied!!"}
        }

    } catch (err) {
        return { error: "Invalid Token!! Please try logging in again" }
    }
}

module.exports = employeeAuth;