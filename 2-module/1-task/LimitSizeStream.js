const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.options = options
    this.addedDataSize = 0
  }
  
  _transform(chunk, encoding, callback) {
    this.addedDataSize += chunk.length
    if(this.addedDataSize > this.options.limit) callback(new LimitExceededError())
    callback(null, chunk)
  }
}

module.exports = LimitSizeStream;
