var request = require('request')
var Client = require('ftp');
var https = require( 'https' )

var c = new Client();
c.on('ready', function() {
  c.list(function(err, list) {
    if (err) throw err;
    console.dir(list);
    c.end();
  });
});

var DEBUG = false
c.connect();

module.exports = function (req, res, next) {

	var botPayload = {}

	checkWhosOut(function(peepstring){
		botPayload.text = peepstring 
		//botPayload.text = "Get it together Cardbot"
		botPayload.username = 'calendarbot'
		botPayload.channel = req.body.channel_id
		botPayload.icon_emoji = ':date:'
		//console.log("botPayload.text: " + botPayload.text);
		
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
 
function checkWhosOut(callback) {

	/*
	var peeps = []
	var peepString = ""
	var peepsPartial = ""
	var data = ""
	
	var options = {
		host: 'www.googleapis.com',
		port: 443,
		path: '/calendar/v3/calendars/riflepaperco.com_2832qms2poc8madqd0uumdmdvo%40group.calendar.google.com/events?fields=items(originalStartTime%2CprivateCopy%2Clocked%2Cdescription%2CrecurringEventId%2CendTimeUnspecified%2Csummary%2Clocation%2Cstart%2Cend%2Cid)&showDeleted=false&maxResults=2500&key=AIzaSyBMo4QCkh6DtK45U_2zPHtB1GfyLH4rWeU',
		method: 'GET'
	}	
	//console.log(options)
	
	var req = https.request(options, function(res) {

		var data = ""
		res.on('data', function (chunk) {

			data += chunk
			
		}).on('end', function() {
			jason = JSON.parse(data)
			//console.log(data);
			// step through the data looking for events today
			
			for ( outskie in jason['items'] ){
				suspect = jason['items'][outskie]
				
				// The following are ternaries to deal with Chrissy putting start and end times on some events
				// If it's an all day event, the start/end fields have a 'date' param, otherwise it's a 'dateTime' param
				
				var startDate = new Date((suspect['start'].hasOwnProperty('date')) ?
									suspect['start']['date'] :
									suspect['start']['dateTime'].substr(0,10))
				var endDate = new Date((suspect['end'].hasOwnProperty('date')) ?
									suspect['end']['date'] :
									suspect['end']['dateTime'].substr(0,10))
				
				var summary		= suspect['summary']
				var name			= summary.substr(0,summary.indexOf(" - "))
				var partial  	= summary.match(/[^()]+/g)[1] || ""
				var testDate	= today
				//if (DEBUG) console.log("%s : %s : %s",startDate, endDate, summary)
				if (startDate <= testDate && endDate > testDate) {
					//if (DEBUG) console.log("'%s'\t\t'%s'", name, partial)
					var usefulName = name
					if (partial) usefulName = usefulName + " (" + partial + ")"
					peeps.push(usefulName)
				}
			}
			if (peeps.length > 5) peepString += "Wow! "
			if (peeps.length > 0){
				peepString += peeps[0]
				if (peeps.length > 1){
					for (var i = 1; i < peeps.length; i++){
						if (i <= peeps.length-2){
							peepString += ","
						}
						peepString += " "
						if (i == peeps.length-1) {
							peepString += "and "
						}
						peepString += peeps[i]
					}
				}
				if (peeps.length > 1) {
					peepString+= " are "
				} else {
					peepString += " is "
				}
				peepString += "scheduled to be out today."
			} else {
				peepString = ""
			}
			callback(peepString)
		})

	})
	req.end()
*/
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


checkWhosOut(function(peepString){
	console.log(peepString)
});
