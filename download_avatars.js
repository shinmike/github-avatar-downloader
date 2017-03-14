var request = require('request');
var fs = require('fs');

var GITHUB_USER = "shinmike";
var GITHUB_TOKEN = "725efd6b8265de3b8377392137d5614c9a57d552";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
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

       var result = data.map(function(value) {
         console.log(value.avatar_url);
       })

       if (error){
         console.log('Error, status:', response.statusCode)
       }

       if (response !== 200) {
         console.log ('Error with status:', response.statusCode)
       }
       }
  });
};

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});