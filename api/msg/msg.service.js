require('dotenv').config();
const dbService = require('../../services/firebaseAction.service')
const logger = require('../../services/logger.service')
const ObjectId = ''
const twilio = require("twilio");
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
console.log(twilioAccountSid);
console.log(twilioAuthToken);

module.exports = {
    query,
    getById,
    update,
    sendMsg
}

const collectionName = 'msg'

async function query() {
    const criteria = {}
    try {
        const collection = await dbService.getCollection(collectionName)
        const msgs = await collection.find(criteria).toArray()
        return msgs
    } catch (err) {
        logger.error('***********cannot find codes', err)
        throw err
    }
}

async function getById(msgId) {
    try {
        const collection = await dbService.getCollection(collectionName)
        const msg = collection.findOne({ _id: ObjectId(msgId) })
        return msg
    } catch (err) {
        logger.error('***********cannot find code', err)
        throw err
    }
}

async function update(msg) {
    try {
        var id = ObjectId(msg._id)
        delete msg._id
        const collection = await dbService.getCollection(collectionName)
        await collection.updateOne({ _id: id }, { $set: { ...msg } })
        return msg
    } catch (err) {
        logger.error(`cannot update board ${boardId}`, err)
        throw err
    }
}

async function sendMsg(sms, phoneNumber) {
    try {
        console.log(phoneNumber)
        console.log(twilioAccountSid);
        console.log(twilioAuthToken);
        const client = new twilio(twilioAccountSid, twilioAuthToken)
        return client.messages
        .create({
          body: sms,
          from: '+16076227189',
          to: phoneNumber
        })
    } catch (err) {
        console.log(err)
    }
}