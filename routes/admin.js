const router = require("express").Router();
const Admin = require('../controllers/admin.controller');
const auth = require("../middleware/auth");

// create new admin
router.post('/create', auth(['admin','sadmin']), async (req, res) => {
    const response = await Admin.create(req.body.email, req.body.password, req.body.name)
    res.json(response)
})

// delete an admin
router.post('/delete', auth(['sadmin']), async (req, res) => {
    const response = await Admin.delete(req.body.email)
    res.json(response)
})

// update admin
router.post('/update', auth(['sadmin']), async (req, res) => {
    const response = await Admin.update(req.body.email, req.body.data)
    res.json(response)
})


module.exports = router;