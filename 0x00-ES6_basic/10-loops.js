export default function appendToEachArrayValue(array, appendString) {
  // إنشاء نسخة من المصفوفة
  const newArray = [...array];

  for (let i = 0; i < newArray.length; i += 1) {
    newArray[i] = appendString + newArray[i]; // تعديل النسخة
  }

  return newArray; // إرجاع النسخة المعدلة
}
