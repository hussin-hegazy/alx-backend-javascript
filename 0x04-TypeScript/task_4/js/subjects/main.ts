// task_4/js/main.ts

import { Cpp } from './subjects/Cpp';
import { Java } from './subjects/Java';
import { React } from './subjects/React';
import { Teacher } from './subjects/Teacher';

// Create and export constants for each subject
const cpp = new Cpp();
const java = new Java();
const react = new React();

// Create a Teacher object with experienceTeachingC
const cTeacher: Teacher = {
    firstName: 'Catherine',
    lastName: 'Smith',
    experienceTeachingC: 10,
};

// Cpp subject operations
console.log('C++');
cpp.setTeacher(cTeacher);
console.log(cpp.getRequirements());
console.log(cpp.getAvailableTeacher());

// Java subject operations
console.log('Java');
java.setTeacher(cTeacher);
console.log(java.getRequirements());
console.log(java.getAvailableTeacher());

// React subject operations
console.log('React');
react.setTeacher(cTeacher);
console.log(react.getRequirements());
console.log(react.getAvailableTeacher());
