var inherits = require('inherits-js');

/**
 * @class Bus
 * @constructor
 * @abstract
 */
function Bus() {}

Bus.prototype = {
    constructor: Bus,

    on: function(event, filter, callback, context) {
        throw new Error("Method must be implemented");
    },

    once: function(event, filter, callback, context) {
        throw new Error("Method must be implemented");
    },

    off: function(event, filter, callback, context) {
        throw new Error("Method must be implemented");
    },

    emit: function(event) {
        throw new Error("Method must be implemented");
    }
};

Bus.ALL = "*";

Bus.extend = function(proto, statics) {
    return inherits(this, proto, statics);
};

module.exports = Bus;