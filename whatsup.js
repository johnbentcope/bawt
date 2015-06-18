var request = require('request')
var ical = require( 'ical.js' )
var https = require( 'https' )

var kidDay = 	new Date("2015-04-23")
var oneout = 	new Date("2015-04-28")
var nobodyout = new Date("2015-04-02")
var today = 	new Date() 

module.exports = function (req, res, next) {

	var botPayload = {}

	checkWhosOut(function(peepstring){
		botPayload.text = peepstring 
		botPayload.username = 'calendarbot'
		botPayload.channel = req.body.channel_id
		botPayload.icon_emoji = ':date:'
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
		});

	})	

}
 
function checkWhosOut(callback) {
	
	var peeps = []
	var peepstring = ""
	var data = ""
	
	var options = {
		host: 'www.google.com',
		port: 443,
		path: '/calendar/ical/riflepaperco.com_hoqbh9sv43me8hlj486tgoveqk%40group.calendar.google.com/public/basic.ics',
		method: 'GET'
	}	
	
	
	var req = https.request(options, function(res) {

		var data = ""
		res.on('data', function (chunk) {

			data += chunk
			
		}).on('end', function() {
			
			//console.log("+++++++++++\n" + data + "\n++++++++++++++")			
			var jcalData = ICAL.parse(data)

			//console.log('///' + JSON.stringify(jcalData) + '///');

			for ( var i = 0; i < jcalData[1][2].length; i++ ) {
				
				var startDate 	= new Date(jcalData[1][2][i][1][0][3])
				var endDate		= new Date(jcalData[1][2][i][1][1][3])
				var testDate	= today

				if (startDate <= testDate && endDate > testDate) {
					//console.log("\n" + jcalData[1][2][i][1][11][3] + "\n++++\n\n")
					var summary = jcalData[1][2][i][1][10][3]
					var name = summary.split(' - ')[0]
					peeps.push(name)
					//console.log("Name: " + name + " -- Summary: " + summary);
				}

			}
			if (peeps.length > 0){
				console.log(peepstring)
				peepstring += "\"" + peeps[0]
				if (peeps.length > 1){
					for (var i = 1; i < peeps.length; i++){
				
						peepstring += "\", "
						if (i == peeps.length-1) {
							peepstring += "and \""
						}
						peepstring += peeps[i]
				
					}
				}
				if(peeps.length > 1){
					peepstring += "\" are"
				} else {
					peepstring += "\" is"
				}
				peepstring += " happening."
			} else {
				peepstring = "Looks like a slow day at the office."
			}
			//console.log("PEEPSTRING: " + peepstring);
			callback(peepstring);
		})

	})
	req.end()

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


checkWhosOut(function(peepstring){
	//console.log(peepstring)
});

