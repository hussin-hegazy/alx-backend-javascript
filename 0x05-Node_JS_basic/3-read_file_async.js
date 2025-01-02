const fs = require('fs');

/**
 * Calculates the number of students from a CSV file and organizes them by field.
 * @param {string} filePath - The path to the CSV file.
 * @returns {Promise<void>}
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (error, fileContent) => {
    if (error) {
      return reject(new Error('Cannot load the database'));
    }

    if (fileContent) {
      const lines = fileContent.trim().split('\n');
      const fields = {};
      const headers = lines[0].split(',');
      const studentAttributes = headers.slice(0, -1);

      lines.slice(1).forEach((row) => {
        const values = row.split(',');
        const studentData = values.slice(0, -1);
        const fieldName = values[values.length - 1];

        if (!fields[fieldName]) {
          fields[fieldName] = [];
        }

        const studentEntry = studentAttributes.reduce((acc, attr, idx) => {
          acc[attr] = studentData[idx];
          return acc;
        }, {});
        fields[fieldName].push(studentEntry);
      });

      const totalStudents = Object.values(fields).flat().length;
      console.log(`Number of students: ${totalStudents}`);

      Object.entries(fields).forEach(([field, students]) => {
        const names = students.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${students.length}. List: ${names}`);
      });

      resolve(true);
    }
  });
});

module.exports = countStudents;
