require("dotenv").config();
const express = require("express");
const {connect} = require("./db/connect")
const cors = require("cors");
const {CustomError} = require("./utils/customError")
const server = express();


server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

server.use(cors(corsOptions));

server.use("/api", require("./routers/auth.routes"), require("./routers/user.routes"));
server.use("/api/question", require("./routers/questions.routes"));

server.use((err, req, res, next) => {
    if (res.headersSent)
        return next(err);
    if (err instanceof CustomError){
        console.log(err);
        return res.status(err.statusCode).json({ error: err.message, status: "failed" });
    }
    else{
        console.log(err)
        res.status(500).json({ error: "Internal Server Error", status: "failed" });
    }
});

const connection = async () => {
    await connect(process.env.URI);
    server.listen(process.env.PORT, () => console.log(`server on port: ${process.env.PORT}`));
}
connection();