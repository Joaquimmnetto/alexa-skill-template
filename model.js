
exports.VoiceResponse = (voice, reprompt) => {
    const innerBuildAlexaResponse = (responseBuilder) => {
        const response = responseBuilder.speak(voice);
        if(reprompt) {
            responseBuilder.reprompt(reprompt);
        }
        return response.getResponse();
    }
    return {buildAlexaResponse: innerBuildAlexaResponse}
}