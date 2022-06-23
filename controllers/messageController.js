import axios from 'axios';
import { User } from "../models";


class messageController {

    constructor(data) {
        this.msg_id = data.msg_id;
        this.phone_no = data.phone_no;
        this.content = data.content;
        this.timestamp = data.timestamp;
    }

    setupConfig() {
        //const configLink = "https://wa.me/4930609859535?text=START"
        const message = `Send message [START] from your phone  to this mobile [4930609859535]  to get your API-KEY`;
        return { status: 200, message: message }
    }

    receiveMessage() {

        return { status: 200, message: "Message receive" }
    }

    async sendMessage(phone_no, message, api_key) {
        
        try{
            const reply = await axios({
                method: "POST",
                headers: {
                    'D360-Api-Key': api_key,
                    'Content-Type': 'application/json',
                },
                url: 'https://waba-sandbox.360dialog.io/v1/messages',
                data: {
                    to: phone_no,
                    type: "text",
                    text: {
                        body: message
                    }
                }
            })
    
            return { status: 200, message: "Message sent" }
        }
        catch(e){
            return { status: 200, message: e }
        }
    }

    async saveMessage(phone_no, message, msg_id, timestamp) {
        
        try{
            const reply = await axios({
                method: "POST",
                headers: {
                    'D360-Api-Key': api_key,
                    'Content-Type': 'application/json',
                },
                url: 'https://waba-sandbox.360dialog.io/v1/messages',
                data: {
                    to: phone_no,
                    type: "text",
                    text: {
                        body: message
                    }
                }
            })
    
            return { status: 200, message: "Message sent" }
        }
        catch(e){
            return { status: 200, message: e }
        }
    }
}


export default messageController