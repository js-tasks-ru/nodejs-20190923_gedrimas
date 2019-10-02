const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.options = options
    this.lineLast = ''
  }

  _transform(chunk, encoding, callback) {
    let str = chunk.toString(this.options.encoding)
    if(this.lineLast) {
      str = this.lineLast + str
    }
    let arr = str.split(os.EOL)
    this.lineLast = arr.splice(arr.length - 1, 1)[0]
    arr.forEach(str => {
      try {
        str && this.push(str)
      }
      catch (err) {
      }
    })
    callback();
  }

  _flush(callback) {
    if (this.lineLast) {
      try {
        this.push(this.lineLast)
      }
      catch (err) {
      }
    }
    this.lineLast = ''
    callback()
  }
}

module.exports = LineSplitStream;
