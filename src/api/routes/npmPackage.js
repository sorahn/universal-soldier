import fetch from 'isomorphic-fetch'

const getPackage = async ctx => {
  const { packageName = '' } = ctx.request.query
  const registryUrl = 'https://registry.npmjs.org'
  const url = [registryUrl, packageName].join('/');

  await fetch(url)
    .then(response => ctx.body = response)
    .catch(error => {
      console.error("error: " + error)
      ctx.error = error
    })
}

export default {
  verb: 'get',
  route: '/api/npmPackage',
  actions: [ getPackage ]
}


// var express = require('express');
// var router = express.Router();
// var request = require("request");

// function getPackage(packageName, cb) {
//   var registryUrl = 'https://registry.npmjs.org';
//   var url = [registryUrl, packageName].join('/');

//   request(url, function (error, response, body) {
//     cb(error, response, body)
//   });
// }

// router.get('/', function(req, res) {

//   var packageName = req.query['npmPackage'] || ''
//   getPackage(packageName, function (error, response, body) {

//     if (error) {
//       console.log("We’ve encountered an error: " + error);
//     }
//     res.json({ npmPackage: JSON.parse(body) })
//   })

// });

// module.exports = router;
