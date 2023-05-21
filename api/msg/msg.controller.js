const msgService = require("./msg.service");
const logger = require("../../services/logger.service");

async function getMsgs(req, res) {
  try {
    const location = req.body.location;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber;
    const phoneNumberOfTherapist = req.body.phoneNumberOfTherapist;

    const sms = name + ' is having an anxiety attack right now, his location is ' + location + ' and his phone number is ' + phoneNumber
    const phone = '+972' + phoneNumberOfTherapist.substring(1)
    const msg = await msgService.sendMsg(sms, phone);
    res.send(msg);
  } catch (err) {
    logger.error("Failed to send sms", err);
    res.status(500).send({ err: "Failed to send sms" });
  }
}

async function getMsg(req, res) {
  try {
    const msg = await msgService.getById(req.params.id);
    res.send(msg);
  } catch (err) {
    logger.error("Failed to get users", err);
    res.status(500).send({ err: "Failed to get users" });
  }
}

async function updateMsg(req, res) {
  try {
    const msg = req.body;
    const updatedMsg = await msgService.update(msg);
    res.json(updatedMsg);
  } catch (err) {
    logger.error("Failed to update board", err);
    res.status(500).send({ err: "Failed to update board" });
  }
}

module.exports = {
  getMsg,
  getMsgs,
  updateMsg: updateMsg,
};
