import getFullBudgetObject from './9-getFullBudget.js';

const fullBudget = getFullBudgetObject(20, 50, 10);

// اختبار الدوال
console.log(fullBudget.getIncomeInDollars(fullBudget.income)); // $20
console.log(fullBudget.getIncomeInEuros(fullBudget.income));   // 20 euros
