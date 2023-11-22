const jwt = require('jsonwebtoken')

/**
 * Authorise user
 * @param {Array} type userTypes to allow authorisation 
 * @param {Boolean} allowOwner  allow authorisation if user owns the account. Default is false
 */
const auth = (type,allowOwner=false) => {
    return (req, res, next) => {
        try {
            const user = jwt.verify(req.headers.token, process.env.JWT_SECRET)

            if (type.includes(user.type) || allowOwner && user.email===req.body.email) {
                req.user = user
            }
            else{
                return res.json({error: "Access Denied!!"})
            }
            next()
        } catch (err) {
            return res.json({error: "Invalid token: Try logging in again"})
        }
    }
};

module.exports = auth;