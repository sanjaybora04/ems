const router = require("express").Router();
const Auth = require('../controllers/auth.controller');

router.post('/signin', async (req, res) => {
  const response = await Auth.signin(req.body.email, req.body.password)
  res.json(response)
})

// superAdmin signin
router.post('/sAdminSignin',async(req,res)=>{
  const response = await Auth.sAdminSignin(req.body.email, req.body.password)
  res.json(response)
})


module.exports = router;