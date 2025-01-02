const fs = require('fs');

/**
 * Analyzes student data from a CSV file and logs group statistics.
 * @param {string} filePath - Path to the CSV file.
 * @returns {Promise<void>}
 */
const analyzeStudentData = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (error, content) => {
    if (error) {
      return reject(new Error('Cannot load the database'));
    }

    if (content) {
      const lines = content.trim().split('\n');
      const headers = lines[0].split(',');
      const studentsByField = {};

      for (const row of lines.slice(1)) {
        const values = row.split(',');
        const student = {};
        for (let i = 0; i < headers.length - 1; i++) {
          student[headers[i]] = values[i];
        }
        const field = values[values.length - 1];

        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(student);
      }

      const totalCount = Object.values(studentsByField)
        .reduce((count, group) => count + group.length, 0);
      console.log(`Number of students: ${totalCount}`);

      for (const [field, group] of Object.entries(studentsByField)) {
        const names = group.map(student => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${group.length}. List: ${names}`);
      }

      resolve();
    }
  });
});

module.exports = analyzeStudentData;
