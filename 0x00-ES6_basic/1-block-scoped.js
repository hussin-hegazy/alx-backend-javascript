export default function taskBlock(trueOrFalse) {
  let task = false; // تغيير var إلى let
  let task2 = true; // تغيير var إلى let

  if (trueOrFalse) {
    let task = true; // تغيير var إلى let
    let task2 = false; // تغيير var إلى let
  }

  return [task, task2];
}
