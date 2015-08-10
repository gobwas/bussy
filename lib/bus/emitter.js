var Bus = require("../bus");
var assert = require("assert");
var _  = require("lodash");
var EventEmitter = require("events").EventEmitter;

var EmitterBus;

/**
 * @class EmitterBus
 * @extends Bus
 */
EmitterBus = Bus.extend(
    /**
     * @lends EmitterBus.prototype
     */
    {
        constructor: function() {
            this.emitter = new EventEmitter();
            this.listeners = [];
        },

        on: function(event, filter, callback, context) {
            this.emitter.on(event, getListener.apply(this, arguments));
        },

        once: function(event, filter, callback, context) {
            this.emitter.once(event, getListener.apply(this, arguments));
        },

        off: function(event, filter, callback, context) {
            if (!_.isFunction(filter)) {
                this.emitter.removeAllListeners(event);
            } else {
                this.emitter.removeListener(event, getListener.apply(this, arguments));
            }
        },

        emit: function(event) {
            var args;

            // construct args for all event
            args = Array.prototype.slice.call(arguments);
            args.unshift(Bus.ALL);

            // emit normal event
            this.emitter.emit.apply(this.emitter, arguments);

            // emit all event
            this.emitter.emit.apply(this.emitter, args);
        }
    }
);



function getListener(event, filter, callback, context) {
    var listener, def;

    if (_.isFunction(filter) && !_.isFunction(callback)) {
        context  = callback;
        callback = filter;
        filter   = null;
    }

    def = {
        event:    event,
        filter:   filter,
        callback: callback,
        context:  context
    };

    if (!(listener = _.find(this.listeners, def))) {
        def.func = function() {
            var valid;

            valid = true;

            if (_.isFunction(filter)) {
                valid = valid && filter.apply(context, arguments);
            }

            if (valid) {
                callback.apply(context, arguments);
            }
        };

        this.listeners.push(def);
    }

    return listener.func;
}

module.exports = EmitterBus;