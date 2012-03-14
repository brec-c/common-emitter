# Emitter class to be used in either NodeJS or Browser environments

# Determine environment: NodeJS vs Browser

# If we're in NodeJS then just return the real EventEmitter
# if typeof _coffeeVarAssumption is 'undefined'
if typeof exports isnt 'undefined'
	if typeof module isnt 'undefined' and module.exports
		return module.exports = require('events').EventEmitter

# WE REQUIRE '_' (underscore)
_ = window['_']
unless _? then _ = require 'underscore'
throw new Error "Underscore library required for Browser use." unless _?
		
# In the Browser, let's implement EventEmitter
class Emitter
	
	maxListeners: 10
	
	addListener: (event, listener, once = false) ->
		@__listeners = {} unless @__listeners?
		@__listeners[event] = [] unless @__listeners[event]?
		@__listeners[event].push 
			listener: listener
			once: once

		if @maxListeners > 0 and _.size(@__listeners) > @maxListeners
			console.log "WARNING: More than #{@maxListeners} listeners connected to #{constructor.name}"
				
		@emit 'newListener', event, listener
		
	on: (event, listener) -> @addListener event, listener
	once: (event, listener) -> @addListener event, listener, true
		
	removeListener: (event, listener) ->
		unless @__listeners? and @__listeners[event]? then return
		@__listeners[event] = _.without @__listeners[event], (entry) ->
			entry.listener is listener
		
	removeAllListeners: (event=null) ->
		unless @__listeners? and @__listeners[event]? then return

		if event isnt null then delete @__listeners[event]
		else
			delete @__listeners
			@__listeners = null
		
	setMaxListeners: (n) ->
		if not _.isNaN n or n < 0
			throw new Error "MaxListeners must be a Number equal to or greater than 0." 
		@maxListeners = Number(n)
		
	listeners: (event) ->
		return null unless @__listeners?
		return @__listeners[event]
		
	emit: (event, args...) ->
		if @__listeners and @__listeners[event]
			queue  = @__listeners[event].slice(0)
			detach = []
			for entry in queue
				func = entry.listener
				func.apply null, args
				if entry.once then detach.push entry
				@__listeners[event] = _.without(@__listeners[event], detach)
	
window['Emitter'] = Emitter
