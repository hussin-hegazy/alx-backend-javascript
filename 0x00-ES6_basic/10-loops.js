export default function appendToEachArrayValue(array, appendString) {
  // نستخدم map لإنشاء مصفوفة جديدة
  return array.map((value) => appendString + value);
}
