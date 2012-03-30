Emitter = require '../'

class Test extends Emitter
	
	ping: (howMany=1)->
		for num in [0..howMany]
			@emit 'ping', num
			
			
test = new Test

test.on 'ping', (num) ->
	console.log "PING(#{num})"

test.ping 5
