const request = require('request');
const sendTextMessage = require('./sendTextMessage');

module.exports = (event) => {
	const senderId = event.sender.id;
	const payload = event.postback.payload;

	if (payload === "Greeting") {
		request({
			url: "https://graph.facebook.com/v2.6/" + senderId,
			qs: {
				access_token: process.env.PAGE_ACCESS_TOKEN,
				fields: "first_name, locale"
			},
			method: "GET"
		}, function(error, response, body) {
			var greeting = "";
			if (error) {
				console.log("Error getting user's name: " + error);
			} else {
				var bodyObj = JSON.parse(body);
				var name = bodyObj.first_name;

				greeting = "Hi " + name + "! ";
			}
			// On greeting, ask if user wants to converse in __ language
			var message = greeting + "I am in development mode, but my goal is to be able to offer to translate your texts."
			sendTextMessage(senderId, greeting + message);
		});
	}
};
