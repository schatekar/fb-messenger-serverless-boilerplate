"use strict";
const AWS = require('aws-sdk');
const FbMessageTypes = require("../messageTypes");
const handleNewMessage = require("./handleNewMessage");

module.exports.handleMessage = (event, context, callback) => {

    let bucketName = event.Records[0].s3.bucket.name;
    let objectKey = event.Records[0].s3.object.key;

    let s3 = new AWS.S3();
    // Retrieve the object
    s3.getObject({
        Bucket: bucketName,
        Key: objectKey
    }, 
    function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(err);
        } else {
            let message = JSON.parse(data.Body.toString("utf-8"));
            handleMessage(message)
                .then(() => {
                    const response = {
                        statusCode: 200
                    };
                    callback(null, response);
                },
                (error) => {
                    console.log(error);
                    callback(error);
                });
        }
    });
}

var handleMessage = (message) => {
    if(message.type === FbMessageTypes.NewMessage()){
        return new Promise((resolve, reject) => {
            handleNewMessage(message, resolve, reject);
        });
    }
}
