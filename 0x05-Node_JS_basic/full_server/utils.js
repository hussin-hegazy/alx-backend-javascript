const fs = require('fs');

function readDatabase(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.split('\n').filter((line) => line.trim() !== '');
        const header = lines[0].split(',');
        const students = lines.slice(1).map((line) => line.split(','));

        const fields = {};
        students.forEach((student) => {
          const field = student[header.indexOf('field')];
          const firstname = student[header.indexOf('firstname')];

          if (!fields[field]) {
            fields[field] = [];
          }
          fields[field].push(firstname);
        });

        resolve(fields);
      }
    });
  });
}

module.exports = readDatabase;
