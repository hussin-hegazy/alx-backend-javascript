import createIteratorObject from './100-createIteratorObject.js';
import createEmployeesObject from './11-createEmployeesObject.js';
import createReportObject from './12-createReportObject.js';

const employees = {
  ...createEmployeesObject('engineering', ['Bob', 'Jane']),
  ...createEmployeesObject('marketing', ['Sylvie']),
};

const report = createReportObject(employees);

// إنشاء iterator
const reportWithIterator = createIteratorObject(report);

// التنقل عبر جميع الموظفين باستخدام حلقة for...of
for (const item of reportWithIterator) {
  console.log(item);
}
