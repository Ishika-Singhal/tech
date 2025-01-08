const allowedOrigins=require('./allowedOrigins')

const corsOtions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  // Allow cookies and credentials to be sent with the request.
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports=corsOtions