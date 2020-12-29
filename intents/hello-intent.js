const VoiceResponse = require("../model").VoiceResponse

module.exports.handle = (request) => {
    return Promise.resolve(VoiceResponse("Bem vindo!", null))
}