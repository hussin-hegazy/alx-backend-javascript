import taskBlock from './1-block-scoped.js';

console.log(taskBlock(true)); // يجب أن يُظهر [true, false]
console.log(taskBlock(false)); // يجب أن يُظهر [false, true]
