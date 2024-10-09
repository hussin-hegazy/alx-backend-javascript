// task_1/js/main.ts

// 1. Define the Teacher interface
interface Teacher {
    firstName: string;
    lastName: string;
    fullTimeEmployee: boolean;
    location: string;
    yearsOfExperience?: number; // Optional attribute
    [key: string]: any; // Allow other attributes
}

// Example of a Teacher object
const teacher3: Teacher = {
    firstName: 'John',
    lastName: 'Doe',
    fullTimeEmployee: false,
    location: 'London',
    contract: false,
};

console.log(teacher3);

// 2. Define the Directors interface that extends Teacher
interface Directors extends Teacher {
    numberOfReports: number; // Required attribute
}

// Example of a Directors object
const director1: Directors = {
    firstName: 'John',
    lastName: 'Doe',
    location: 'London',
    fullTimeEmployee: true,
    numberOfReports: 17,
};

console.log(director1);

// 3. Implement the printTeacher function
interface printTeacherFunction {
    (firstName: string, lastName: string): string;
}

const printTeacher: printTeacherFunction = (firstName, lastName) => {
    return `${firstName[0]}. ${lastName}`;
}

// Example usage of printTeacher
console.log(printTeacher("John", "Doe")); // Output: J. Doe

// 4. Define the StudentClass
interface StudentClassInterface {
    firstName: string;
    lastName: string;
}

class StudentClass implements StudentClassInterface {
    constructor(public firstName: string, public lastName: string) {}

    workOnHomework(): string {
        return 'Currently working';
    }

    displayName(): string {
        return this.firstName;
    }
}

// Example usage of StudentClass
const student = new StudentClass('Alice', 'Smith');
console.log(student.displayName()); // Output: Alice
console.log(student.workOnHomework()); // Output: Currently working

