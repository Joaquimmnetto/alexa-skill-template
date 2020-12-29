'use strict';
const Alexa = require("ask-sdk-core")
const AlexaHandlers = require("./alexa-event-handlers")


exports.lambdaHandler = Alexa.SkillBuilders.custom()
                                .addRequestHandlers(
                                    AlexaHandlers.launchHandler(require("./intents/hello-intent")),
                                    AlexaHandlers.intentHandler(require("./intents/hello-intent"), "HelloIntentName")
                                )
                                .addErrorHandlers(AlexaHandlers.errorHandler)
                                .withApiClient(new Alexa.DefaultApiClient())
                                .lambda();