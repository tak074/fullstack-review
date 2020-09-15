const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (userName) => {
  let options = {
    method: 'GET',
    url: `https://api.github.com/repos/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  axios(options);

}

module.exports.getReposByUsername = getReposByUsername;