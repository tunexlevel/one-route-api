import messageController from "../controllers/setupController";
import { checkSchema, validationResult } from 'express-validator';
import schema from "../schema/message";

const router = (router, pool, poolConnect) => {
    router.post("/setup", checkSchema(schema), async (req, res) => {
        
        let message = new messageController(req.body)
        let reply = message.setupConfig();

        res.send(reply);
    });

    router.post("/send/message", checkSchema(schema()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let message = new messageController()
        let phone_no = req.body.phone_no;
        let content = req.body.message;
        let api_key = req.body.key; //"GoU0mk_sandbox"
        let reply = await message.sendMessage(phone_no, content, api_key);

        res.send(reply);
    });

    router.post("/save/message", checkSchema(schema()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let message = new messageController()
        let phone_no = req.body.phone_no;
        let content = req.body.message;
        let msg_id = req.body.msg_id;
        let reply = await message.saveMessage(phone_no, content, msg_id, timestamp);

        res.send(reply);
    });

    router.post("/receive/message", checkSchema(schema()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let message = new messageController()
        let phone_no = req.body.phone_no;
        let content = req.body.message;
        let msgId = req.body.msg_id;
        let api_key = req.body.key; 
        let reply = await message.sendMessage(phone_no, content, api_key);

        res.send(reply);
    });

    router.post("/template/message", checkSchema(schema()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let message = new messageController()
        let phone_no = req.body.phone_no;
        let content = req.body.message;
        let msgId = req.body.msg_id;
        let api_key = req.body.key; 
        let reply = await message.sendMessage(phone_no, content, api_key);

        res.send(reply);
    });

    router.post("/list/interaction", checkSchema(schema()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let message = new messageController()
        let phone_no = req.body.phone_no;
        let content = req.body.message;
        let msgId = req.body.msg_id;
        let api_key = req.body.key; 
        let reply = await message.sendMessage(phone_no, content, api_key);

        res.send(reply);
    });


};

export default router;
