const http = require('http');
const fs = require('fs');

const SERVER_PORT = 1245;
const SERVER_HOST = 'localhost';
const server = http.createServer();
const DATABASE_FILE = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Reads a CSV file and counts students grouped by field.
 * @param {String} filePath - Path to the CSV file.
 * @returns {Promise<String>} - Formatted student count.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    return reject(new Error('Cannot load the database'));
  }

  fs.readFile(filePath, 'utf-8', (error, content) => {
    if (error) {
      return reject(new Error('Cannot load the database'));
    }

    const lines = content.trim().split('\n');
    const studentGroups = {};
    const headers = lines[0].split(',');
    const properties = headers.slice(0, headers.length - 1);

    lines.slice(1).forEach((line) => {
      const values = line.split(',');
      const studentData = values.slice(0, -1);
      const field = values[values.length - 1];

      if (!studentGroups[field]) {
        studentGroups[field] = [];
      }

      const studentEntry = properties.reduce((acc, prop, idx) => {
        acc[prop] = studentData[idx];
        return acc;
      }, {});

      studentGroups[field].push(studentEntry);
    });

    const totalStudents = Object.values(studentGroups).flat().length;
    const result = [`Number of students: ${totalStudents}`];

    Object.entries(studentGroups).forEach(([field, students]) => {
      const names = students.map((s) => s.firstname).join(', ');
      result.push(`Number of students in ${field}: ${students.length}. List: ${names}`);
    });

    resolve(result.join('\n'));
  });
});

const ROUTES = [
  {
    path: '/',
    handler(_, response) {
      const message = 'Hello Holberton School!';
      response.setHeader('Content-Type', 'text/plain');
      response.setHeader('Content-Length', Buffer.byteLength(message));
      response.statusCode = 200;
      response.end(message);
    },
  },
  {
    path: '/students',
    handler(_, response) {
      const result = ['This is the list of our students'];
      countStudents(DATABASE_FILE)
        .then((data) => {
          result.push(data);
          const finalResponse = result.join('\n');
          response.setHeader('Content-Type', 'text/plain');
          response.setHeader('Content-Length', Buffer.byteLength(finalResponse));
          response.statusCode = 200;
          response.end(finalResponse);
        })
        .catch((error) => {
          result.push(error.message);
          const finalResponse = result.join('\n');
          response.setHeader('Content-Type', 'text/plain');
          response.setHeader('Content-Length', Buffer.byteLength(finalResponse));
          response.statusCode = 200;
          response.end(finalResponse);
        });
    },
  },
];

server.on('request', (req, res) => {
  const route = ROUTES.find((r) => r.path === req.url);
  if (route) {
    route.handler(req, res);
  }
});

server.listen(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Server running at -> http://${SERVER_HOST}:${SERVER_PORT}/`);
});

module.exports = server;
