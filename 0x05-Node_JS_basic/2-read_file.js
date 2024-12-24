/* eslint-disable no-param-reassign */
const fs = require('fs');

/**
 * Counts the number of students in a CSV data file.
 * @param {String} dataPath The path to the CSV data file.
 * @throws {Error} If the database cannot be loaded.
 */
const countStudents = (dataPath) => {
  // Check if the file exists and is a valid file
  if (!fs.existsSync(dataPath) || !fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // Read the file, split it into lines, and process the header
  const fileLines = fs.readFileSync(dataPath, 'utf-8').trim().split('\n');
  const dbFieldNames = fileLines.shift().split(',');
  const studentPropNames = dbFieldNames.slice(0, -1);

  // Group students by the last field (could be some category like field of study, class, etc.)
  const studentGroups = fileLines.reduce((groups, line) => {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, -1);
    const field = studentRecord[studentRecord.length - 1];

    // Initialize the group if it doesn't exist
    groups[field] = groups[field] || [];
    
    // Add the student record to the group
    groups[field].push(Object.fromEntries(studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]])));
    return groups;
  }, {});

  // Calculate the total number of students
  const totalStudents = Object.values(studentGroups).reduce((pre, cur) => pre + cur.length, 0);
  console.log(`Number of students: ${totalStudents}`);

  // Log the number of students in each group, along with their names
  for (const [field, group] of Object.entries(studentGroups)) {
    const studentNames = group.map((student) => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
