import config from "./config.json";
import http from "http";
import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import router from "./route";
import swaggerUi from "swagger-ui-express";
import Yaml from "yamljs";

const app = express();

let server = http.createServer(app);

const swaggerDocument = Yaml.load('./swagger.yaml');


console.log("OK. Deployment mode set to ", config.env);

server.listen(config[config.env].port);

console.log("App running on port", server.address().port);

app.use(cors());

app.use(bodyparser.json({ limit: "50mb" }));

app.use(bodyparser.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router(app);

app.get("*", function (req, res) {
    res.send("************* ONE ROUTE API V1.O **************");
});


