const fs = require('fs');
module.exports = {
    //were functions is methods
    readFile(path) {
        return new Promise((resolve, reject) => {
          fs.readFile(path, 'UTF-8', function (err, data) {
            if (err) reject(err);
            resolve(data);
          })
        })
    },
    readdir(path) {
        return new Promise((resolve, reject) => {
          fs.readdir(path, (err, photos) => {
            if (err) reject(err);
            resolve(photos);
          })
        })
    }
}
