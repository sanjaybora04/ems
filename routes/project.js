const router = require("express").Router();
const Project = require('../controllers/project.controller')
const auth = require('../middleware/auth')

// create Project
router.post('/create', auth(['admin','sadmin']), async(req,res)=>{
    const response = await Project.create(req.body.title,req.body.description)
    res.json(response)
})

// delete Project
router.post('/delete', auth(['admin','sadmin']), async(req,res)=>{
    const response = await Project.delete(req.body.projectId)
    res.json(response)
})

// update Project
router.post('/update', auth(['admin','sadmin']), async(req,res)=>{
    const response = await Project.update(req.body.projectId,req.body.data)
    res.json(response)
})

// assign Project to employee
router.post('/assign', auth(['admin','sadmin']), async(req,res)=>{
    const response = await Project.assign(req.body.projectId,req.body.email)
    res.json(response)
})

module.exports = router;