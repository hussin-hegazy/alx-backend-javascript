// إنشاء الدالة
function getListStudents() {
  // إرجاع مصفوفة تحتوي على 3 كائنات
  return [
    {
      id: 1,
      firstName: 'Guillaume',
      location: 'San Francisco'
    },
    {
      id: 2,
      firstName: 'James',
      location: 'Columbia'
    },
    {
      id: 5,
      firstName: 'Serena',
      location: 'San Francisco'
    }
  ];
}

// تصدير الدالة للاستخدام في ملفات أخرى
export default getListStudents;
