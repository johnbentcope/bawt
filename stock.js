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

function send (payload, callback) {
    //var path = process.env.INCOMING_WEBHOOK_PATH;
    var path = '/T03MQBBHJ/B04H9MABW/5HeNoIBgsatXtnchmlkYcoZJ'
    var uri = 'https://hooks.slack.com/services' + path
    request({
        uri: uri,
        method: 'POST',
        body: JSON.stringify(payload)
    }, function (error, response, body) {
        if(error) {
            return callback(error)
        }

        callback(null, response.statusCode, body)
    });
}

