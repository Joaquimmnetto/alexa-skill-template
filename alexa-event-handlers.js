const Alexa = require("ask-sdk-core")

module.exports.errorHandler = {
    canHandle: (handlerInput) => true,
    handle: (handlerInput, error) => {
        const speakOutput = "Um erro ocorreu";
        console.error(`Error: ${error}`);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
}

const eventHandler = (intentModule, requestCondition) => { 
    return {
        canHandle: (handlerInput) => requestCondition(
                                        Alexa.getRequestType(handlerInput.requestEnvelope),
                                        Alexa.getRequestType(handlerInput.requestEnvelope) == "IntentRequest"?
                                        Alexa.getIntentName(handlerInput.requestEnvelope) : null),
        handle: (handlerInput) => {
            const request = handlerInput.requestEnvelope.request
            return intentModule.handle(request)
                                .then(voiceResponse => voiceResponse.buildAlexaResponse(handlerInput.responseBuilder))
        }
    }
}

module.exports.launchHandler = (intentModule) => eventHandler(intentModule, (requestType, ignore) => requestType === "LaunchRequest")
module.exports.intentHandler = (intentModule, ...intentNames) => eventHandler(intentModule, 
                                                        (requestType, intentName) => requestType === "IntentRequest" 
                                                                                    && intentNames.includes(intentName))
