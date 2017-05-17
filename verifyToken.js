
module.exports.verify = (event, context, callback) => {

  const query = event.queryStringParameters;

  if(query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN){

     const response = {
      statusCode: 200,
      headers: {"content-type": "text/plain"},
      body: query['hub.challenge'],
    };
    callback(null, response);
  }
  else{
    callback("Failed validation. Make sure the validation tokens match", null);
  }    
}