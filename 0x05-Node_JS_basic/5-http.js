const http = require('http');
const fs = require('fs');

const PORT = 1245;
const HOST = 'localhost';
const app = http.createServer();
const DB_PATH = process.argv.length > 2 ? process.argv[2] : '';

/**
 * Reads and processes student data from a CSV file.
 * @param {String} filePath The path to the CSV file.
 * @returns {Promise<String>} A formatted report of students.
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  if (!filePath) {
    reject(new Error('Cannot load the database'));
  } else {
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
      } else {
        const lines = data.trim().split('\n');
        const fields = lines[0].split(',');
        const students = {};
        const headers = fields.slice(0, -1);

        lines.slice(1).forEach((line) => {
          const values = line.split(',');
          const studentData = values.slice(0, -1);
          const field = values.at(-1);

          if (!students[field]) {
            students[field] = [];
          }

          const student = headers.reduce((obj, header, index) => {
            obj[header] = studentData[index];
            return obj;
          }, {});

          students[field].push(student);
        });

        const totalStudents = Object.values(students).flat().length;
        const report = [`Number of students: ${totalStudents}`];

        Object.entries(students).forEach(([field, group]) => {
          const names = group.map((s) => s.firstname).join(', ');
          report.push(`Number of students in ${field}: ${group.length}. List: ${names}`);
        });

        resolve(report.join('\n'));
      }
    });
  }
});

const ROUTES = [
  {
    route: '/',
    handler: (_, res) => {
      const message = 'Hello Holberton School!';
      res.setHeader('Content-Type', 'text/plain');
      res.setHeader('Content-Length', Buffer.byteLength(message));
      res.statusCode = 200;
      res.end(message);
    },
  },
  {
    route: '/students',
    handler: (_, res) => {
      const response = ['This is the list of our students'];
      countStudents(DB_PATH)
        .then((report) => {
          response.push(report);
          const output = response.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', Buffer.byteLength(output));
          res.statusCode = 200;
          res.end(output);
        })
        .catch((err) => {
          response.push(err.message);
          const output = response.join('\n');
          res.setHeader('Content-Type', 'text/plain');
          res.setHeader('Content-Length', Buffer.byteLength(output));
          res.statusCode = 200;
          res.end(output);
        });
    },
  },
];

app.on('request', (req, res) => {
  const route = ROUTES.find((r) => r.route === req.url);
  if (route) {
    route.handler(req, res);
  }
});

app.listen(PORT, HOST, () => {
  process.stdout.write(`Server listening at -> http://${HOST}:${PORT}\n`);
});

module.exports = app;
