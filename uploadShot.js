var request = require('request');
var fs = require('fs');
const path = require("path")
const file = path.join(__dirname,"shot.jpg")

const data = fs.readFileSync('./config.json', 'utf8')
const config = JSON.parse(data);

let options = {
  'method': 'POST',
  'url': config.uploadShotUrl,
  formData: {
    '11': {
      'value': fs.createReadStream(file),
      'options': {
        'filename': file,
        'contentType': null
      }
    }
  }
};

request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
});


// **version of promise**

// var rp = require('request-promise');
// var fs = require('fs');
// const path = require("path")

// const file = path.join(__dirname,"shot.jpg")

// var options = {
//   'method': 'POST',
//   'uri': 'http://110.40.204.35:5580/upload/shot',
//   formData: {
//     '1': {
//       'value': fs.createReadStream(file),
//       'options': {
//         'filename': file,
//         'contentType': null
//       }
//     }
//   }
// };

// module.exports = {
//     uploadShot:async () => {
//         await rp(options).then(res=> {
//             console.log(res);
//             return
//         })
//     }
// }