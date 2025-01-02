const http = require('http');
const fs = require('fs');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const server = http.createServer();
const DATABASE_PATH = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Retrieves the count of students from a CSV file.
 * @param {String} filePath The path to the CSV file.
 */
const getStudentCount = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      reject(new Error('Cannot load the database'));
    }

    const reportLines = [];
    const rows = content.toString('utf-8').trim().split('\n');
    const studentCategories = {};
    const columnHeaders = rows[0].split(',');
    const studentAttributes = columnHeaders.slice(0, columnHeaders.length - 1);

    rows.slice(1).forEach((row) => {
      const studentData = row.split(',');
      const attributeValues = studentData.slice(0, studentData.length - 1);
      const category = studentData[studentData.length - 1];

      if (!Object.keys(studentCategories).includes(category)) {
        studentCategories[category] = [];
      }

      const studentInfo = studentAttributes.map((attr, index) => [attr, attributeValues[index]]);
      studentCategories[category].push(Object.fromEntries(studentInfo));
    });

    const totalStudents = Object.values(studentCategories).reduce((count, group) => count + group.length, 0);
    reportLines.push(`Number of students: ${totalStudents}`);

    Object.entries(studentCategories).forEach(([category, group]) => {
      reportLines.push(`Number of students in ${category}: ${group.length}. List: ${group.map(student => student.firstname).join(', ')}`);
    });

    resolve(reportLines.join('\n'));
  });
});

const ROUTES = [
  {
    path: '/',
    handler: (_, response) => {
      const message = 'Hello Holberton School!';

      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', message.length);
      response.statusCode = 200;
      response.write(Buffer.from(message));
    },
  },
  {
    path: '/students',
    handler: (_, response) => {
      const responseLines = ['This is the list of our students'];

      getStudentCount(DATABASE_PATH)
        .then((report) => {
          responseLines.push(report);
          const finalResponse = responseLines.join('\n');

          response.setHeader('Content-Type', 'text/plain');
          response.setHeader('Content-Length', finalResponse.length);
          response.statusCode = 200;
          response.write(Buffer.from(finalResponse));
        })
        .catch((err) => {
          responseLines.push(err.message);
          const finalResponse = responseLines.join('\n');

          response.setHeader('Content-Type', 'text/plain');
          response.setHeader('Content-Length', finalResponse.length);
          response.statusCode = 200;
          response.write(Buffer.from(finalResponse));
        });
    },
  },
];

server.on('request', (request, response) => {
  for (const route of ROUTES) {
    if (route.path === request.url) {
      route.handler(request, response);
      return;
    }
  }
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  process.stdout.write(`Server listening at -> http://${SERVER_HOST}:${SERVER_PORT}\n`);
});

module.exports = server;
