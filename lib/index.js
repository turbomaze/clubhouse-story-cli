const readline = require('readline');
const Writable = require('stream').Writable;

const mutableStdout = new Writable({
  write: function(chunk, encoding, callback) {
    if (!this.muted) {
      process.stdout.write(chunk, encoding);
    }

    callback();
  }
});

function requestPassword(promptMessage, callback) {
  const reader = readline.createInterface({
    input: process.stdin,
    output: mutableStdout,
    terminal: true
  });
  mutableStdout.muted = false;
  reader.question(promptMessage, value => {
    callback(value);
    reader.close();
  });
  mutableStdout.muted = true;
}

module.exports = {
  requestPassword
};
