import setupController from "../controllers/setupController";
import { checkSchema, validationResult } from 'express-validator';
import setup  from "../schema/setup";

const router = (router) => {

    router.post("/setup", checkSchema(setup()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let setup = new setupController(req.body)
        let reply = await setup.setupConfig();

        res.status(reply.status).send(reply);
    });

    router.put("/setup", checkSchema(setup()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let setup = new setupController(req.body)
        let reply = await setup.updateConfig();

        res.status(reply.status).send(reply);
    });

    router.get("/:phone_no/setup",  async (req, res) => {
        
        if (!req.params.phone_no) {
            return res.status(400).json({ errors: "phone number is required" });
        }

        let setup = new setupController({phone_no: req.params.phone_no})
        let reply = await setup.getConfig();

        res.status(reply.status).send(reply);
    });

    router.delete("/:phone_no/setup",  async (req, res) => {
        if (!req.params.phone_no) {
            return res.status(400).json({ errors: "phone number is required" });
        }

        console.log(req.params.phone_no)

        let setup = new setupController({phone_no: req.params.phone_no})
        let reply = await setup.deleteConfig();

        res.status(reply.status).send(reply);
    });




};

export default router;
