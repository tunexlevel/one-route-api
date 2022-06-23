import axios from 'axios';
import config from '../config.json';
import { Message, Setup } from "../models";
import moment from 'moment';


class messageController {

    constructor(data) {
        this.msg_id = data.msg_id;
        this.phone_no = data.phone_no;
        this.message = data.message;
        this.timestamp = data.timestamp;
        this.name = data.name;
    }

    setupConfig() {
        //const configLink = "https://wa.me/4930609859535?text=START"
        const message = `Send message [START] from your phone  to this mobile [4930609859535]  to get your API-KEY`;
        return { status: 200, message: message }
    }

    async receiveMessage() {
        const setup = await Message.findOne({ order: [['id', 'DESC']], where: { phone_no: this.phone_no, type: 'inbox' } });

        if (!setup) {
            return { status: 200, message: "No message found" };
        }

        return { status: 200, message: setup }
    }

    async sendMessage() {

        try {

            const setup = await Setup.findOne({ where: { phone_no: this.phone_no } });
            if (!setup) {
                return { status: 400, message: "You need to setup configuration for this phone number" }
            }

            const reply = await axios({
                method: "POST",
                headers: {
                    'D360-Api-Key': setup.key,
                    'Content-Type': 'application/json',
                },
                url: config.send_message_endpoint,
                data: {
                    to: this.phone_no,
                    type: "text",
                    text: {
                        body: this.message
                    }
                }
            })

            const msg_id = reply.data.messages ? reply.data.messages[0].id : "not_found";

            Message.create({ message: this.message, phone_no: this.phone_no, msg_id: msg_id, type: "outbox", timestamp: new Date() })

            return { status: 200, message: "Message sent" }
        }
        catch (e) {
            return { status: 400, message: e }
        }
    }

    async sendTemplateMessage() {

        try {

            const setup = await Setup.findOne({ where: { phone_no: this.phone_no } });
            if (!setup) {
                return { status: 400, message: "You need to setup configuration for this phone number" }
            }

            const reply = await axios({
                method: "POST",
                headers: {
                    'D360-Api-Key': setup.key,
                    'Content-Type': 'application/json',
                },
                url: config.send_message_endpoint,
                data: {
                    to: this.phone_no,
                    type: "template",
                    template: {
                        namespace: "c8ae5f90_307a_ca4c_b8f6_d1e2a2573574",
                        language: {
                            policy: "deterministic",
                            code: "de"
                        },
                        name: this.name, //"first_welcome_messsage"
                        components: [{
                            type: "body",
                            parameters: [{
                                type: "text",
                                text: this.message
                            }
                            ]
                        }
                        ]
                    }
                }
            })

            const msg_id = reply.data.messages ? reply.data.messages[0].id : "not_found";

            Message.create({ message: this.message, phone_no: this.phone_no, msg_id: msg_id, type: "outbox", timestamp: new Date() })

            return { status: 200, message: "Message sent" }
        }
        catch (e) {
            return { status: 400, message: e }
        }
    }

    async saveMessage() {

        try {

            const timestamp = this.convertTimestamp();

            Message.create({ message: this.message, phone_no: this.phone_no, msg_id: this.msg_id, type: "inbox", timestamp: timestamp })

            return { status: 200, message: "Message saved" }
        }
        catch (e) {
            return { status: 200, message: e }
        }
    }

    convertTimestamp() {
        return moment.unix(this.timestamp).format('YYYY-MM-DD HH:mm:ss')
    }

}


export default messageController