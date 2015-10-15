var path = require('path')
var request = require('request')
var fs = require('fs')
var csv = require('csv')
var parse = require('csv-parse')
var https = require('https')
var contents = ""
var text = ""

module.exports = function (req, res, next) {
console.log("TEST")
  var botPayload = {}

  logTheThing(function(stockstring){
    botPayload.text = stockstring;
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

function reader(callback){
	fs.readFile('http://johnbentcope.com/stockupdate.csv', 'utf8', function (err,data) {
 		if (err) {
    	return console.log(err)
  	}
		contents = data.toString();
		callback()
	})
}

function logTheThing(callback){
	parse(contents, {comment:'#'}, function(err, output){
		//console.log(output)
		for (record in output){
			text += output[record][0] + " is " + output[record][2] + " until " + output[record][4];
			text = "\n <" 
		}
		callback(text)
	})
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


logTheThing(function(stockString){
  console.log(stockString)
});

