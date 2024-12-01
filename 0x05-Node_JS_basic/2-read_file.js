const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8'); // قراءة الملف بشكل متزامن
    const lines = data.split('\n').filter((line) => line.trim() !== ''); // حذف السطور الفارغة

    if (lines.length === 0) throw new Error('Cannot load the database');

    const header = lines[0].split(','); // العناوين
    const students = lines.slice(1); // البيانات

    console.log(`Number of students: ${students.length}`);

    const fields = {};
    students.forEach((student) => {
      const values = student.split(',');
      const field = values[header.indexOf('field')];
      const name = values[header.indexOf('firstname')];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(name);
    });

    for (const field in fields) {
      console.log(
        `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`
      );
    }
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
