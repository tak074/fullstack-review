const axios = require('axios');
const config = require('../config.js');
// body parser?

let getReposByUsername = (user, callback) => {
  console.log(user);
  console.log('inside getusername from github.js');

  let options = {
    method: 'GET',
    url: `https://api.github.com/users/${user}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  return axios(options)
    .then((result) => {
      console.log(result.data);
      console.log('to git hub. success');
      callback(null, result.data);
    })
    .catch((error) => {
      console.log('to git hub. error');
      callback(error, 400);
    });
}

module.exports.getReposByUsername = getReposByUsername;