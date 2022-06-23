import config from "./config.json";
import http from "http";
import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import router from "./route";


const app = express();

let server = http.createServer(app);


console.log("OK. Deployment mode set to ", config.env);

server.listen(config[config.env].port);

console.log("App running on port", server.address().port);

app.use(cors());

app.use(bodyparser.json({ limit: "50mb" }));

app.use(bodyparser.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: true }));

router(app);

app.get("*", function (req, res) {
    res.send("************* ONE ROUTE API V1.O **************");
});


