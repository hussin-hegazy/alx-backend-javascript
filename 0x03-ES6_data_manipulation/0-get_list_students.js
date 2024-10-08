// إنشاء الدالة
function getListStudents() {
  // إرجاع مصفوفة تحتوي على 3 كائنات
  return [
    {
      id: 1,
      firstName: 'Guillaume',
      location: 'San Francisco',
    }, // إضافة فاصلة هنا
    {
      id: 2,
      firstName: 'James',
      location: 'Columbia',
    }, // إضافة فاصلة هنا
    {
      id: 5,
      firstName: 'Serena',
      location: 'San Francisco',
    }, // إضافة فاصلة هنا
  ]; // إضافة فاصلة هنا
}

// تصدير الدالة للاستخدام في ملفات أخرى
export default getListStudents;
