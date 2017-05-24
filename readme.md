This is a boilerplate code demostrating [Facebook Messenger Platform](https://developers.facebook.com/docs/messenger-platform) integration with a backend based on AWS. The purpose of this boilerplate is to provide a decent starting point for the people who are new to the Facebook messenger platform. The boilerplate is based on [Serverless framework](https://serverless.com/)

# How to use 
1. Clone this repo
2. Run `npm install` in the cloned directory
3. Setup [Serverless CLI](https://serverless.com/framework/docs/providers/aws/guide/quick-start/) 
4. Run `sls deploy`. This will deploy all the components in your configured AWS account. The output of the command will show the HTTP endpoint URLs that get configured. We need these in next step to configured webhooks in FB
5. Follow [Facebook Messenger Getting Started guide](https://developers.facebook.com/docs/messenger-platform/guides/quick-start) to configured your chatbot

That's it. You are setup. Now if you send a message to your page using FB messenger app, it will respond with `Pingback: {original message}`

# The Architecture
Every time Facebook 

# Code walkthrough
