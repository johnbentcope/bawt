var request = require('request')

module.exports = function (req, res, next) {

	var botPayload = {}

	getStock(function(stockstring){
		botPayload.text = stockstring 
		botPayload.username = 'calendarbot'
		botPayload.channel = req.body.channel_id
		botPayload.icon_emoji = ':bar_chart:'
		console.log("botPayload.text: " + botPayload.text);
		
		send(botPayload, function (error, status, body) {
			if (error) {
				return next(error)
	
			} else if (status !== 200) {
				// inform user that our Incoming WebHook failed
				return next(new Error('Incoming WebHook l : ' + status + ' ' + body + "\n") )

			} else {
				return res.status(200).end()
			}
		});//*/

	})	

}

function getStock(callback) {
	callback("derp");
}
 
