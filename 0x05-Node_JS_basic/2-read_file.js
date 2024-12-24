const fs = require('fs');

const countStudents = (dataPath) => {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Cannot load the database');
  }

  if (!fs.statSync(dataPath).isFile()) {
    throw new Error('Cannot load the database');
  }

  // قراءة محتويات الملف وتحويله إلى مصفوفة من الأسطر
  const fileLines = fs.readFileSync(dataPath, 'utf-8')
    .trim()
    .split('\n');

  // استخراج أسماء الحقول من السطر الأول
  const [header, ...dataLines] = fileLines;
  const dbFieldNames = header.split(',');
  const studentPropNames = dbFieldNames.slice(0, dbFieldNames.length - 1);

  const studentGroups = {};

  // معالجة كل سطر بيانات بعد السطر الأول (بيانات الطلاب)
  for (const line of dataLines) {
    const studentRecord = line.split(',');
    const studentPropValues = studentRecord.slice(0, studentRecord.length - 1);
    const field = studentRecord[studentRecord.length - 1];

    // إذا كانت المجموعة الخاصة بالطلاب غير موجودة، يتم إنشاؤها
    if (!studentGroups[field]) {
      studentGroups[field] = [];
    }

    // دمج الخصائص والقيم الخاصة بالطالب في كائن
    const studentEntries = studentPropNames.map((propName, idx) => [propName, studentPropValues[idx]]);
    studentGroups[field].push(Object.fromEntries(studentEntries));
  }

  // حساب إجمالي عدد الطلاب
  const totalStudents = Object.values(studentGroups)
    .reduce((total, group) => total + group.length, 0);
  
  console.log(`Number of students: ${totalStudents}`);

  // طباعة تفاصيل عدد الطلاب في كل مجموعة
  for (const [field, group] of Object.entries(studentGroups)) {
    const studentNames = group.map(student => student.firstname).join(', ');
    console.log(`Number of students in ${field}: ${group.length}. List: ${studentNames}`);
  }
};

module.exports = countStudents;
