const express = require('express');
const github = require('../helpers/github');
const database = require('../database/index');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

  github.getReposByUsername(req.body.term, function(err, result) {
    if (err) {
      console.log('ERROR');
      res.status(result);
      return;
    }
    console.log('inside of getReposByUserName callback');
    // console.log(result);

    res.status(200);
    database.save(result);
    res.end();
  });
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

