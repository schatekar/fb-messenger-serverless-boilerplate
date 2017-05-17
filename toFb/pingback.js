"use strict";

const request = require('request');


var sendMessage = (message, resolve, reject) => {
    var data = {
        recipient: {
            id: message.sender.id
        },
        message: {
            text: `Pingback: ${message.message.text}`
        }
    }
    
    request({
        uri: process.env.FB_SEND_MESSAGE_API_URL,
        qs: { access_token: process.env.FB_PAGE_ACCESS_TOKEN },
        method: 'POST',
        json: data
    }, 
	function (error, res, body) {
        if(error){
            reject(error);
        }
        else{
            resolve();
        }
  })  
}

module.exports = (message) => {
    return new Promise((resolve, reject) => {
        sendMessage(message, resolve, reject);
    });
}