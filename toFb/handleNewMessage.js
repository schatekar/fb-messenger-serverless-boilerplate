"use strict";

const pingback = require("./pingback");

module.exports = (message, resolve, reject) => {
        pingback(message)
        .then(  
            () => resolve(),
            (error) => reject(error)
        );
}