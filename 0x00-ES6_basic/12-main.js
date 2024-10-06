import createEmployeesObject from './11-createEmployeesObject.js';
import createReportObject from './12-createReportObject.js';

const employees = {
  ...createEmployeesObject('engineering', ['Bob', 'Jane']),
  ...createEmployeesObject('marketing', ['Sylvie']),
};

const report = createReportObject(employees);

console.log(report.allEmployees); // طباعة جميع الموظفين
console.log(report.getNumberOfDepartments()); // طباعة عدد الأقسام
