import axios from 'axios';
import { Setup } from "../models";


class setupController {

    constructor(data) {
        this.key = data.key;
        this.phone_no = data.phone_no;
        this.timestamp = data.timestamp;
    }

    async setupConfig() {
        try {
            console.log({ key: this.key, phone_no: this.phone_no });
            const setup = await Setup.create({ key: this.key, phone_no: this.phone_no });
            return { status: 200, message: "The setup was created successfully" }
        }
        catch (e) {
            return { status: 400, message: e.errors }
        }
    }

    async getConfig() {
        try {
            const setup = await Setup.findOne({ where: { phone_no: this.phone_no } });
            if (!setup) {
                return { status: 400, message: "Phone number not found! You need to setup configuration for this phone number" }
            }
            return { status: 200, message: setup }
        }
        catch (e) {
            return { status: 400, message: e.errors }
        }
    }

    async updateConfig() {
        try {
            const setup = await Setup.findOne({ where: { phone_no: this.phone_no } });
            if (!setup) {
                return { status: 400, message: "Phone number not found! You need to setup configuration for this phone number" }
            }
            
            Setup.update({ key: this.key }, { where: { phone_no: this.phone_no } });
            return { status: 200, message: "The setup was updated successfully" }
        }
        catch (e) {
            return { status: 400, message: e }
        }
    }

    async deleteConfig() {
        try {
            const setup = await Setup.findOne({ where: { phone_no: this.phone_no } });
            if (!setup) {
                return { status: 400, message: "Phone number not found! You need to setup configuration for this phone number" }
            }
            Setup.destroy({ where: { phone_no: this.phone_no } });
            return { status: 200, message: "The setup was deleted successfully" }
        }
        catch (e) {
            return { status: 400, message: e }
        }
    }

}


export default setupController;