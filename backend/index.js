const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const uuid = require("uuid");
const PORT = 8000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true,
}));

const sessionStorage = {}

app.post("/auth", (req, res) => {
    const {name} = req.body || {};
    if(!name) return res.status(400).send({"error": "Name is required"});
    const sessionId = uuid.v4();
    res.cookie("sessionId", sessionId, {maxAge: 90000, httpOnly: true});
    sessionStorage[sessionId] = {name};
    res.send({});
});

const authMiddleware = (req, res, next) => {
    const session = req.cookies.sessionId;
    if(!session || !sessionStorage[session]){
        res.sendStatus(403);
        return;
    }
    req._session = sessionStorage[session];
    next();
}

app.get("/home", authMiddleware, (req, res) => {
    const {name} = req._session;
    res.send({ name });
});

app.listen(PORT, () => {
    console.log("Server is running")
});