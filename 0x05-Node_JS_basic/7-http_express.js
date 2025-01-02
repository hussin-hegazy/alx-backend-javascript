const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 1245;
const DB_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @author Bezaleel Olakunori <https://github.com/B3zaleel>
 */
const countStudents = (dataPath) => new Promise((resolve, reject) => {
  if (!dataPath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataPath) {
    fs.readFile(dataPath, (error, fileData) => {
      if (error) {
        reject(new Error('Cannot load the database'));
      }
      if (fileData) {
        const reportLines = [];
        const fileLines = fileData.toString('utf-8').trim().split('\n');
        const studentGroups = {};
        const csvHeaders = fileLines[0].split(',');
        const studentAttributes = csvHeaders.slice(0, csvHeaders.length - 1);

        for (const line of fileLines.slice(1)) {
          const studentRecord = line.split(',');
          const studentValues = studentRecord.slice(0, studentRecord.length - 1);
          const field = studentRecord[studentRecord.length - 1];
          if (!Object.keys(studentGroups).includes(field)) {
            studentGroups[field] = [];
          }
          const studentEntries = studentAttributes.map((attribute, index) => [
            attribute,
            studentValues[index],
          ]);
          studentGroups[field].push(Object.fromEntries(studentEntries));
        }

        const totalStudentCount = Object.values(studentGroups).reduce(
          (previous, current) => (previous || []).length + current.length,
        );
        reportLines.push(`Number of students: ${totalStudentCount}`);
        for (const [field, group] of Object.entries(studentGroups)) {
          reportLines.push([
            `Number of students in ${field}: ${group.length}.`,
            'List:',
            group.map((student) => student.firstname).join(', '),
          ].join(' '));
        }
        resolve(reportLines.join('\n'));
      }
    });
  }
});

app.get('/', (_, response) => {
  response.send('Hello Holberton School!');
});

app.get('/students', (_, response) => {
  const responseContent = ['This is the list of our students'];

  countStudents(DB_FILE)
    .then((report) => {
      responseContent.push(report);
      const responseText = responseContent.join('\n');
      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', responseText.length);
      response.statusCode = 200;
      response.write(Buffer.from(responseText));
    })
    .catch((error) => {
      responseContent.push(error instanceof Error ? error.message : error.toString());
      const responseText = responseContent.join('\n');
      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', responseText.length);
      response.statusCode = 200;
      response.write(Buffer.from(responseText));
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});

module.exports = app;
