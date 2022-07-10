const { port } = require('./config')

const express = require('express');
const route = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const connectMongoose = require('./utils/connectMongoose')
const userRoute = require('./routes/user')

const app = express();
const PORT = port;

connectMongoose()

app.use(express.json())

app.use('/api', route)
app.use('/api/users', userRoute)

app.use(errorHandler)

app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running, and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

