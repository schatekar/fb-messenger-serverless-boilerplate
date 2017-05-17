'use strict';
const AWS  = require("aws-sdk");
const uuid = require("node-uuid");
const FbMessageTypes = require("../messageTypes");


module.exports.digest = (event, context, callback) =>{
  const body = JSON.parse(event.body);

  if(body){
    processBody(body);
  }

  sendAckToFacebook(callback);
}

var sendAckToFacebook = (callback) => {
  const response = {
      statusCode: 200
  };
  callback(null, response);
}

var processBody = (body) => {
  if(body){
    if(body.object === "page"){
      processEntries(body.entry);
    }
  }  
}

var processEntries = (entries) => {
    if(entries){
      entries.forEach((entry) => {
          processMessagingArray(entry.messaging, entry.id, entry.time);
      });
    }
}

var processMessagingArray = (messagingArray, pageid, timestamp) => {
    if(messagingArray){
      messagingArray.forEach((messaging) => {
        processMessaging(messaging, pageid, timestamp);
      });
    }
}

var processMessaging = (messaging, pageid, timestamp) => {
    messaging["pageid"] = pageid;
    messaging["timestamp"] = timestamp;

    setType(messaging);
    persistMessage(messaging);
}

var setType = (messaging) => {
    if(messaging.message){
      messaging["type"] = FbMessageTypes.NewMessage();
    }
    else if(messaging.delivery){
      messaging["type"] = "message_delivery";
    }
}

var persistMessage = (messaging, pageid) => {
  let s3 = new AWS.S3();
  let params = {
    Bucket: process.env.S3_BUCKET_FOR_FB_MESSAGES,
    Key: uuid.v4(),
    Body: JSON.stringify(messaging)
  };

  s3.putObject(params, function(err, data){
    if(err){
      console.log(err);
    }
  });
}