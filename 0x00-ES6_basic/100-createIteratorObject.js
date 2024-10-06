export default function createIteratorObject(report) {
  // قائمة لتخزين جميع الموظفين من كل الأقسام
  const allEmployees = [];
  
  // التنقل عبر كل قسم في report.allEmployees
  for (const department of Object.values(report.allEmployees)) {
    allEmployees.push(...department); // إضافة جميع الموظفين في كل قسم إلى القائمة
  }

  // إرجاع iterator للتنقل بين الموظفين
  return allEmployees[Symbol.iterator]();
}
