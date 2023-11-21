const router = require("express").Router();
const User = require('../controllers/user.controller');
const adminAuth = require("../middleware/adminAuth");
const sadminAuth = require("../middleware/sadminAuth");

router.post('/signin', async (req, res) => {
  const response = await User.signin(req.body.email, req.body.password)
  res.json(response)
})

// superAdmin signin
router.post('/sAdminSignin',async(req,res)=>{
  const response = await User.sAdminSignin(req.body.email, req.body.password)
  res.json(response)
})

// create new admin
router.post('/createAdmin', adminAuth, async (req, res) => {
    const response = await User.createAdmin(req.body.email, req.body.password, req.body.name)
    res.json(response)
})

// delete an admin
router.post('/deleteAdmin', sadminAuth, async (req, res) => {
    const response = await User.deleteAdmin(req.body.email)
    res.json(response)
})

// update admin
router.post('/updateAdmin', sadminAuth, async (req, res) => {
    const response = await User.updateAdmin(req.body.email, req.body.data)
    res.json(response)
})

// create new employee
router.post('/createEmployee', adminAuth, async (req, res) => {
    const response = await User.createEmployee(req.body.email, req.body.password, req.body.name)
    res.json(response)
})

// delete an Employee
router.post('/deleteEmployee', adminAuth, async (req, res) => {
    const response = await User.deleteEmployee(req.body.email)
    res.json(response)
})

// update Employee
router.post('/updateEmployee', adminAuth, async (req, res) => {
    const response = await User.updateEmployee(req.body.email, req.body.data)
    res.json(response)
})


module.exports = router;