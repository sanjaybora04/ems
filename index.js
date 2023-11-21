const path = require('path')
const express = require('express');
const cors = require('cors');

//Root routes
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const employee = require('./routes/employee');


const app = express();


app.use(cors());
app.use(express.json())


// Routes
app.use('/',auth)
app.use('/',admin)
app.use('/',employee)


app.listen(process.env.PORT,()=>{
    console.log(`server started at Port : ${process.env.PORT}`);
})