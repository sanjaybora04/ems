const router = require("express").Router();
const Session = require('../controllers/session.controller')
const auth = require('../middleware/auth')

// Start Session
router.post('/start', auth(['employee']), async(req,res)=>{
    const response = await Session.start(req.user.email)
    res.json(response)
})

// End Session
router.post('/end', auth(['employee']), async(req,res)=>{
    const response = await Session.end(req.user.email, req.body.data)
    res.json(response)
})

// Pause Session
router.post('/pause', auth(['employee']), async(req,res)=>{
    const response = await Session.pause(req.user.email)
    res.json(response)
})

// Resume Session
router.post('/resume', auth(['employee']), async(req,res)=>{
    const response = await Session.resume(req.user.email)
    res.json(response)
})

module.exports = router;