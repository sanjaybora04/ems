const path = require('path')
const express = require('express');
const cors = require('cors');

//Root routes
const user = require('./routes/user');


const app = express();


app.use(cors());
app.use(express.json())


// Routes
app.use('/',user)


app.listen(process.env.PORT,()=>{
    console.log(`server started at Port : ${process.env.PORT}`);
})