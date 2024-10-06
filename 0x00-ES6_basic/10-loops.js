export default function appendToEachArrayValue(array, appendString) {
  for (const value of array) {
    // نبحث عن فهرس القيمة في المصفوفة
    const idx = array.indexOf(value);
    array[idx] = appendString + value;
  }

  return array;
}
