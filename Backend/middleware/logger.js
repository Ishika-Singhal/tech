const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs=require('fs')
const fspromises = require('fs').promises
const path = require('path')

const logEvents = async (message, logFileName) => {
    const dateTime = format(new Date(), 'dd/MM/yyyy\tHH:mm:ss')
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`
    try {
        // check if path exists or not
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fspromises.mkdir(path.join(__dirname, "..", "logs"));
        }
        await fspromises.appendFile(path.join(__dirname, "..", "logs", logFileName), logItem);

    }
    catch (error) {
        console.log(error)
    }
}

// custom middleware
const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)
    next();
}

module.exports={logger,logEvents}