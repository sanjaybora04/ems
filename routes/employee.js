const router = require("express").Router();
const Employee = require('../controllers/employee.controller');
const adminAuth = require("../middleware/adminAuth");
const employeeAuth = require('../middleware/employeeAuth')


// create new employee
router.post('/createEmployee', adminAuth, async (req, res) => {
    const response = await Employee.createEmployee(req.body.email, req.body.password, req.body.name)
    res.json(response)
})

// delete an Employee
router.post('/deleteEmployee', adminAuth, async (req, res) => {
    const response = await Employee.deleteEmployee(req.body.email)
    res.json(response)
})

// update Employee
router.post('/updateEmployee', adminAuth, async (req, res) => {
    const response = await Employee.updateEmployee(req.body.email, req.body.data)
    res.json(response)
})

// Start Session
router.post('/startSession', employeeAuth, async(req,res)=>{
    const response = await Employee.startSession(req.user.email)
    res.json(response)
})

// End Session
router.post('/endSession', employeeAuth, async(req,res)=>{
    const response = await Employee.endSession(req.user.email, req.body.data)
    res.json(response)
})

// Pause Session
router.post('/pauseSession', employeeAuth, async(req,res)=>{
    const response = await Employee.pauseSession(req.user.email)
    res.json(response)
})

// Resume Session
router.post('/resumeSession', employeeAuth, async(req,res)=>{
    const response = await Employee.resumeSession(req.user.email)
    res.json(response)
})

module.exports = router;