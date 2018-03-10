const request = require('request')

// const APP_SECRET = process.env.APP_SECRET
const PAGE_ACCESS_TOKEN = process.env.BOT_PAGE_TOKEN

function callSendAPI(messageData) {
    return new Promise(function (resolve, reject) {

        request({
            uri: 'https://graph.facebook.com/v2.6/me/messages',
            qs: {
                access_token: PAGE_ACCESS_TOKEN
            },
            method: 'POST',
            json: messageData

        }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var recipientId = body.recipient_id;
                var messageId = body.message_id;

                resolve({
                    messageId: messageId,
                    recipientId: recipientId,
                    message: "Successfully sent message with id " + messageId + " to recipient " + recipientId
                });
            } else {
                console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
                reject(error);
            }
        });
    });
}

function sendTextMessage(recipientId, messageText) {
    var messageData = {
        recipient: {
            id: recipientId
        },
        message: {
            text: messageText,
            metadata: "DEVELOPER_DEFINED_METADATA"
        }
    };
    return callSendAPI(messageData);
}


module.exports = {sendTextMessage}