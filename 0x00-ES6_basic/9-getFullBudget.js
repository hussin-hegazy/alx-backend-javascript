import getBudgetObject from './7-getBudgetObject';

export default function getFullBudgetObject(income, gdp, capita) {
  // استدعاء getBudgetObject لإنشاء كائن budget
  const budget = getBudgetObject(income, gdp, capita);

  // إنشاء كائن fullBudget وإضافة الدوال باستخدام ES6 method properties
  const fullBudget = {
    ...budget,
    getIncomeInDollars(income) {
      return `$${income}`;
    },
    getIncomeInEuros(income) {
      return `${income} euros`;
    },
  };

  return fullBudget;
}
