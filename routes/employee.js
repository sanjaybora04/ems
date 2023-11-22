const router = require("express").Router();
const Employee = require('../controllers/employee.controller');
const auth = require("../middleware/auth");

// create new employee
router.post('/create', auth(['admin','sadmin']), async (req, res) => {
    const response = await Employee.create(req.body.email, req.body.password, req.body.name)
    res.json(response)
})

// delete an Employee
router.post('/delete', auth(['admin','sadmin']), async (req, res) => {
    const response = await Employee.delete(req.body.email)
    res.json(response)
})

// update Employee
router.post('/update', auth(['admin','sadmin']), async (req, res) => {
    const response = await Employee.update(req.body.email, req.body.data)
    res.json(response)
})

module.exports = router;