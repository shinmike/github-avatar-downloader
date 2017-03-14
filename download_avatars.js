var request = require('request');
var fs = require('fs');

var GITHUB_USER = "shinmike";
var GITHUB_TOKEN = "725efd6b8265de3b8377392137d5614c9a57d552";

console.log('Welcome to the GitHub Avatar Downloader!');

var repoOwner = process.argv[2];
var repoName = process.argv[3];

function getRepoContributors(repoOwner, repoName, cb) {

  if (!repoOwner || !repoName) {
   console.error('Please return correct name and repo')
   return;
  }

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };

  request.get(options, function (error, response, body)  {

    if(!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      if (error){
        console.log('Error, status:', response.statusCode);
      };
      if (response !== 200) {
       console.log ('Correct outcome. Status code is:', response.statusCode);
     };
      cb(null, result)
    }
  });
}

getRepoContributors(repoOwner, repoName, function(err, result) {
 if(!err) {
   for(one of result) {
     console.log(one.login + "   :   " + one.avatar_url);
     const origFileName = one.login;
     const newFileName = `./${origFileName}.jpg`;
     downloadImageByURL(one.avatar_url, newFileName);
   }
 }
});

function downloadImageByURL(url, filePath) {
 request.get(url)
 .on('error', function (err) {
   throw err;
 })
 .on('response', function (response) {
   console.log('Response Status Code: ', response.statusCode);
})
 .pipe(fs.createWriteStream(filePath));
}