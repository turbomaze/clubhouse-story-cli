const Writable = require('stream').Writable;
const fetch = require('node-fetch');
const readline = require('readline');
const config = require('./config');

const mutableStdout = new Writable({
  write: function(chunk, encoding, callback) {
    if (!this.muted) {
      process.stdout.write(chunk, encoding);
    }

    callback();
  }
});

async function insertStory(story, token) {
  console.log(`\nINSERTING STORY:\n  ${JSON.stringify(story.name)}`);

  return fetchHelper('/stories', token, {
    method: 'POST',
    body: JSON.stringify(story)
  });
}

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

function listToMap(list, keyFunction) {
  return list.reduce((mapping, item) => {
    const key = keyFunction(item);
    mapping[key] = item;
    return mapping;
  }, {});
}

async function fetchHelper(endpoint, token, options = {}) {
  const url = getUrl(endpoint, token);
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', },
    ...options
  });
  return response.json();
}

function getUrl(path, token) {
  return `${config.baseUrl}/api/v3${path}?token=${token}`;
}

module.exports = {
  fetchHelper,
  getUrl,
  insertStory,
  listToMap,
  requestPassword
};
