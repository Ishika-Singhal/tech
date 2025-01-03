const express = require('express')
const app = express()
const path = require("path");
const PORT = process.env.PORT || 3000;
const { logger } =require('./middleware/logger')
const errorHandler = require("./middleware/errorHandler");
const route = require('./routes/root');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')


app.use(logger)

app.use(express.json())

app.use(cors(corsOptions));

app.use(cookieParser())

app.use('/',express.static(path.join(__dirname,'public')))

app.use('/', route)

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname,"views","404.html"))
    } else if (req.accepts('json')) {
        res.json({message:"404 Not Found"})
    } else {
        re.type('txt').send("404 Not Found")
    }
})
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
