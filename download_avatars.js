var request = require('request');

var GITHUB_USER = "shinmike";
var GITHUB_TOKEN = "29e352f40b5364b8f86cc54a776ea09d349da289";

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {

  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

  var options = {
    url: requestURL,
    headers: {
      'User-Agent': 'request'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      var result = info.map(function(value){
        console.log('avatar_url:', value.avatar_url);
      });
      console.log('statusCode:', response.statusCode);
    }
  }

  // Step 5 - not clear why it is called like this?...
  request(options, callback);

}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});















// var request = require('request');
// var fs = require('fs');
//
// var GITHUB_USER = "shinmike";
// var GITHUB_TOKEN = "29e352f40b5364b8f86cc54a776ea09d349da289";
//
// console.log('Welcome to the GitHub Avatar Downloader!');
//
// var repoOwner = process.argv[2];
// var repoName = process.argv[3];
//
// function getRepoContributors(repoOwner, repoName, cb) {
//
//   if (!repoOwner || !repoName) {
//    console.error('Please return correct name and repo');
//    return;
//   }
//
//   var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
//
//   var options = {
//     url: requestURL,
//     headers: {
//       'User-Agent': 'request'
//     }
//   };
//
//   request.get(options, function (error, response, body)  {
//
//     if(!error && response.statusCode == 200) {
//       var data = JSON.parse(body);
//       if (error){
//         console.log('Error, status:', response.statusCode);
//       }
//       if (response !== 200) {
//        console.log ('Correct outcome. Status code is:', response.statusCode);
//      }
//       cb(null, result);
//     }
//   });
// }
//
// getRepoContributors(repoOwner, repoName, function(err, result) {
//  if(!err) {
//    for(one of result) {
//      console.log(one.login + "   :   " + one.avatar_url);
//      const origFileName = one.login;
//      const newFileName = `./${origFileName}.jpg`;
//      downloadImageByURL(one.avatar_url, newFileName);
//    }
//  }
// });
//
// function downloadImageByURL(url, filePath) {
//  request.get(url)
//  .on('error', function (err) {
//    throw err;
//  })
//  .on('response', function (response) {
//    console.log('Response Status Code: ', response.statusCode);
// })
//  .pipe(fs.createWriteStream(filePath));
// }
