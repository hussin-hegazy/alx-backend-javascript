const fs = require('fs');

/**
 * Counts the students in a CSV file.
 * @param {String} filePath The path to the CSV file.
 * @author Modified by Another Author
 */
const countStudents = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
      reject(new Error('Cannot load the database'));
    }
    if (content) {
      const rows = content
        .toString('utf-8')
        .trim()
        .split('\n');
      const groupByField = {};
      const headerFields = rows[0].split(',');
      const studentFields = headerFields
        .slice(0, headerFields.length - 1);

      for (const row of rows.slice(1)) {
        const studentInfo = row.split(',');
        const fieldValues = studentInfo
          .slice(0, studentInfo.length - 1);
        const fieldName = studentInfo[studentInfo.length - 1];
        if (!Object.keys(groupByField).includes(fieldName)) {
          groupByField[fieldName] = [];
        }
        const studentEntry = studentFields
          .map((key, index) => [key, fieldValues[index]]);
        groupByField[fieldName].push(Object.fromEntries(studentEntry));
      }

      const total = Object
        .values(groupByField)
        .reduce((acc, group) => acc + group.length, 0);
      console.log(`Number of students: ${total}`);
      for (const [field, students] of Object.entries(groupByField)) {
        const studentNames = students.map((student) => student.firstname).join(', ');
        console.log(`Number of students in ${field}: ${students.length}. List: ${studentNames}`);
      }
      resolve(true);
    }
  });
});

module.exports = countStudents;
