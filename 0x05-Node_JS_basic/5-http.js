const http = require('http');
const fs = require('fs');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const serverApp = http.createServer();
const DATABASE_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Counts the students in a CSV data file.
 * @param {String} dataFilePath The path to the CSV data file.
 * @author Bezaleel Olakunori <https://github.com/B3zaleel>
 */
const countStudents = (dataFilePath) => new Promise((resolve, reject) => {
  if (!dataFilePath) {
    reject(new Error('Cannot load the database'));
  }
  if (dataFilePath) {
    fs.readFile(dataFilePath, (error, fileData) => {
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

const ROUTE_HANDLERS = [
  {
    route: '/',
    handler(_, response) {
      const greetingMessage = 'Hello Holberton School!';

      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', greetingMessage.length);
      response.statusCode = 200;
      response.write(Buffer.from(greetingMessage));
    },
  },
  {
    route: '/students',
    handler(_, response) {
      const responseContent = ['This is the list of our students'];

      countStudents(DATABASE_FILE)
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
    },
  },
];

serverApp.on('request', (request, response) => {
  for (const routeHandler of ROUTE_HANDLERS) {
    if (routeHandler.route === request.url) {
      routeHandler.handler(request, response);
      break;
    }
  }
});

serverApp.listen(SERVER_PORT, SERVER_HOST, () => {
  process.stdout.write(`Server listening at -> http://${SERVER_HOST}:${SERVER_PORT}\n`);
});

module.exports = serverApp;
