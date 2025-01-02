const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOSTNAME = 'localhost';
const server = http.createServer();
const DATABASE_FILE = process.argv[2] || '';

/**
 * Processes a CSV file to count students by field.
 * @param {String} filePath - Path to the CSV file.
 * @returns {Promise<String>} - Report of student counts.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
    return;
  }
  fs.readFile(filePath, 'utf-8', (error, content) => {
    if (error) {
      reject(new Error('Cannot load the database'));
      return;
    }
    const lines = content.trim().split('\n');
    const headers = lines[0].split(',');
    const groups = {};
    const fieldHeaders = headers.slice(0, -1);

    lines.slice(1).forEach((line) => {
      const values = line.split(',');
      const field = values[values.length - 1];
      const studentData = values.slice(0, -1);

      if (!groups[field]) {
        groups[field] = [];
      }

      const student = fieldHeaders.reduce((obj, header, index) => {
        obj[header] = studentData[index];
        return obj;
      }, {});
      groups[field].push(student);
    });

    const total = Object.values(groups).flat().length;
    const report = [`Number of students: ${total}`];

    for (const [field, students] of Object.entries(groups)) {
      const names = students.map((s) => s.firstname).join(', ');
      report.push(`Number of students in ${field}: ${students.length}. List: ${names}`);
    }

    resolve(report.join('\n'));
  });
});

const ROUTES = [
  {
    path: '/',
    handler: (_, res) => {
      const message = 'Hello Holberton School!';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(message));
      res.statusCode = 200;
      res.end(message);
    },
  },
  {
    path: '/students',
    handler: (_, res) => {
      const output = ['This is the list of our students'];
      countStudents(DATABASE_FILE)
        .then((result) => {
          output.push(result);
          const response = output.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', Buffer.byteLength(response));
          res.statusCode = 200;
          res.end(response);
        })
        .catch((error) => {
          output.push(error.message);
          const response = output.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', Buffer.byteLength(response));
          res.statusCode = 200;
          res.end(response);
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

server.listen(PORT, HOSTNAME, () => {
  process.stdout.write(`Server running at http://${HOSTNAME}:${PORT}/\n`);
});

module.exports = server;
