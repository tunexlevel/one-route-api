import messageController from "../controllers/messageController";
import { checkSchema, validationResult } from 'express-validator';
import { message, saveMessage, templateMessage} from "../schema/message";

const router = (router) => {
    
    router.post("/message", checkSchema(message()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let message = new messageController(req.body)
        let reply = await message.sendMessage();

        res.status(reply.status).send(reply);
    });

    router.post("/save/message", checkSchema(saveMessage()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let message = new messageController(req.body)
        
        let reply = await message.saveMessage();

        res.status(reply.status).send(reply);
    });

    router.get("/:phone_no/message",  async (req, res) => {

        if (!req.params.phone_no) {
            return res.status(400).json({ errors: "phone number is required" });
        }

        let message = new messageController({phone_no: req.params.phone_no})
        let reply = await message.receiveMessage();

        res.send(reply);
    });

    router.post("/template/message", checkSchema(templateMessage()), async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let message = new messageController(req.body)
        let reply = await message.sendTemplateMessage();

        res.send(reply);
    });

    router.post("/list/interaction", checkSchema(message()), async (req, res) => {
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
