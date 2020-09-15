const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

// inside mangoose.once('open', function(){})?

let repoSchema = mongoose.Schema({
  repoID: Number,
  repoName: String,
  owner: {login: String, id: Number},
  repoDesc: String,
  repoUrl: String,
  forkCount: Number
});

let Repo = mongoose.model('Repo', repoSchema);

  let save = (data) => {
    // TODO: Your code here
    // This function should save a repo or repos to
    // the MongoDB

    let repo = new Repo({
      repoID: data.id,
      repoName: data.name,
      owner: {login: data['owner']['login'], id: data['owner']['id']},
      repoDesc: data.description,
      repoUrl: data['html_url'],
      forkCount: data['forks_count']
    })

    var checkAndSave = function(repo) {
      let repoName = repo.RepoName;
      let id = repo.repoID;

      let duplicate = Repo.find({repoID: id}, function(err, result) {
        if (err) {
          return false;
        } else {
          return true;
        }
      })

      if (duplicate) {
        console.log(repoName+ ' already exists')
        return;
      }
      // save if it does not exist.
      repo.save((err, repoName) => {
        if (err) return console.error(err);
        console.log(repoName + 'has been saved');
      })
    };

    if (Array.isArray(repo)) {
      for (var i = 0; i < repo.length; i++) {
        repo = repo[i];
        checkAndSave(repo);
      }
    } else {
      checkAndSave(repo);
    }
  };

module.exports.save = save;