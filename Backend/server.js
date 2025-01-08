require('dotenv').config();
// loads environment variables from a .env file into process.env.
const express = require('express')
const app = express()
const path = require("path");
const PORT = process.env.PORT || 3000;
const { logger,logEvents } =require('./middleware/logger')
const errorHandler = require("./middleware/errorHandler");
const route = require('./routes/root');
const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')

connectDB()

app.use(logger)

app.use(express.json())

// Use CORS middleware with options
app.use(cors(corsOptions));

// use to parse and manage cookies sent in HTTP request 
app.use(cookieParser())

//built in middleware used to express where to find static files like css,images
app.use('/',express.static(path.join(__dirname,'public')))

app.use('/', route)
app.use('/users',userRoute)
app.use('/notes',noteRoute)

// all route => *
app.all('*', (req, res) => {
    res.status(404);
    // checkif client accepts a specified content type
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,"views","404.html"))
    } else if (req.accepts('json')) {
        res.json({message:"404 Not Found"})
    } else {
        re.type('txt').send("404 Not Found")
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
})

mongoose.connection.on('error', (err) => {
    console.log(err);
    logEvents(
      `${err.name}:${err.code}\t${err.syscall}\t${err.hostname}`,
      "mongoErrLog.log"
    );
})

