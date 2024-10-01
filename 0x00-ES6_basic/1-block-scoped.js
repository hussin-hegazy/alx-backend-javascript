export default function taskBlock(trueOrFalse) {
  const task = false;
  const task2 = true;

  if (trueOrFalse) {
    // استخدم قيمة المتغيرات حسب الحاجة أو أزلها إذا لم تكن ضرورية
    return [true, false]; // على سبيل المثال، إرجاع القيم الجديدة مباشرة
  }

  return [task, task2];
}
