const router = require("express").Router();
const Admin = require('../controllers/admin.controller');
const adminAuth = require("../middleware/adminAuth");
const sadminAuth = require("../middleware/sAdminAuth");

// create new admin
router.post('/createAdmin', adminAuth, async (req, res) => {
    const response = await Admin.createAdmin(req.body.email, req.body.password, req.body.name)
    res.json(response)
})

// delete an admin
router.post('/deleteAdmin', sadminAuth, async (req, res) => {
    const response = await Admin.deleteAdmin(req.body.email)
    res.json(response)
})

// update admin
router.post('/updateAdmin', sadminAuth, async (req, res) => {
    const response = await Admin.updateAdmin(req.body.email, req.body.data)
    res.json(response)
})


module.exports = router;