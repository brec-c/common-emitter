(function() {
  var Emitter,
    __slice = Array.prototype.slice;

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      return module.exports = require('events').EventEmitter;
    }
  }

  if (window['_'] == null) {
    throw new Error("Underscore library required for Browser use.");
  }

  Emitter = (function() {

    function Emitter() {}

    Emitter.prototype.maxListeners = 10;

    Emitter.prototype.addListener = function(event, listener, once) {
      if (once == null) once = false;
      if (this.__listeners == null) this.__listeners = {};
      if (this.__listeners[event] == null) this.__listeners[event] = [];
      this.__listeners[event].push({
        listener: listener,
        once: once
      });
      if (this.maxListeners > 0 && _.size(this.__listeners) > this.maxListeners) {
        console.log("WARNING: More than " + this.maxListeners + " listeners connected to " + constructor.name);
      }
      return this.emit('newListener', event, listener);
    };

    Emitter.prototype.on = function(event, listener) {
      return this.addListener(event, listener);
    };

    Emitter.prototype.once = function(event, listener) {
      return this.addListener(event, listener, true);
    };

    Emitter.prototype.removeListener = function(event, listener) {
      if (!((this.__listeners != null) && (this.__listeners[event] != null))) {
        return;
      }
      return this.__listeners[event] = _.without(this.__listeners[event], function(entry) {
        return entry.listener === listener;
      });
    };

    Emitter.prototype.removeAllListeners = function(event) {
      if (event == null) event = null;
      if (!((this.__listeners != null) && (this.__listeners[event] != null))) {
        return;
      }
      if (event !== null) {
        return delete this.__listeners[event];
      } else {
        delete this.__listeners;
        return this.__listeners = null;
      }
    };

    Emitter.prototype.setMaxListeners = function(n) {
      if (!_.isNaN(n || n < 0)) {
        throw new Error("MaxListeners must be a Number equal to or greater than 0.");
      }
      return this.maxListeners = Number(n);
    };

    Emitter.prototype.listeners = function(event) {
      if (this.__listeners == null) return null;
      return this.__listeners[event];
    };

    Emitter.prototype.emit = function() {
      var args, detach, entry, event, func, queue, _i, _len, _results;
      event = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      if (this.__listeners && this.__listeners[event]) {
        queue = this.__listeners[event].slice(0);
        detach = [];
        _results = [];
        for (_i = 0, _len = queue.length; _i < _len; _i++) {
          entry = queue[_i];
          func = entry.listener;
          func.apply(null, args);
          if (entry.once) detach.push(entry);
          _results.push(this.__listeners[event] = _.without(this.__listeners[event], detach));
        }
        return _results;
      }
    };

    return Emitter;

  })();

  window['Emitter'] = Emitter;

}).call(this);
