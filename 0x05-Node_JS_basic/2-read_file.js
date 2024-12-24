const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8'); // قراءة الملف بشكل متزامن
    const lines = data.split('\n').filter((line) => line.trim() !== ''); // حذف السطور الفارغة

    if (lines.length === 0) throw new Error('Cannot load the database');

    const header = lines[0].split(','); // العناوين
    const students = lines.slice(1); // البيانات

    console.log(`Number of students: ${students.length}`);

    // تحقق من وجود الأعمدة 'field' و 'firstname' في الهيدر
    const fieldIndex = header.indexOf('field');
    const nameIndex = header.indexOf('firstname');
    
    // إذا لم يكن هناك عمود 'field' أو 'firstname' في الهيدر، رمي خطأ
    if (fieldIndex === -1 || nameIndex === -1) {
      throw new Error('Missing field or firstname column in the data');
    }

    const fields = {};
    students.forEach((student) => {
      const values = student.split(',');

      // التأكد من أن البيانات تحتوي على نفس عدد الأعمدة كما في الهيدر
      if (values.length !== header.length) {
        throw new Error('Data row does not match header column count');
      }

      const field = values[fieldIndex];
      const name = values[nameIndex];

      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(name);
    });

    // طباعة عدد الطلاب في كل مجال
    for (const field in fields) {
      console.log(
        `Number of students in ${field}: ${fields[field].length}. List: ${fields[field].join(', ')}`
      );
    }
  } catch (err) {
    console.error('Error:', err.message); // عرض رسالة الخطأ بشكل دقيق
  }
}

module.exports = countStudents;
