const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const shotEmitter = new MyEmitter();

module.exports =  {
    shotEmitter
}
