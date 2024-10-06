export default function createReportObject(employeesList) {
  return {
    allEmployees: {
      ...employeesList, // استخدام الـ spread لتوزيع قيم employeesList
    },
    getNumberOfDepartments() {
      return Object.keys(employeesList).length; // حساب عدد الأقسام
    },
  };
}
