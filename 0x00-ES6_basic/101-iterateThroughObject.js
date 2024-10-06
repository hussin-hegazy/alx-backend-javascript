export default function iterateThroughObject(reportWithIterator) {
  const employeeNames = []; // مصفوفة لتخزين أسماء الموظفين
  
  // التنقل عبر جميع الموظفين باستخدام iterator
  for (const name of reportWithIterator) {
    employeeNames.push(name); // إضافة اسم الموظف إلى المصفوفة
  }

  // إرجاع الأسماء كسلسلة نصية مفصولة بواسطة |
  return employeeNames.join(' | '); 
}
