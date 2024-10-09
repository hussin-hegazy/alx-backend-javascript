// task_2/js/main.ts

// 1. Define the DirectorInterface
interface DirectorInterface {
    workFromHome(): string;
    getCoffeeBreak(): string;
    workDirectorTasks(): string;
}

// 2. Define the TeacherInterface
interface TeacherInterface {
    workFromHome(): string;
    getCoffeeBreak(): string;
    workTeacherTasks(): string;
}

// 3. Implement the Director class
class Director implements DirectorInterface {
    workFromHome(): string {
        return 'Working from home';
    }

    getCoffeeBreak(): string {
        return 'Getting a coffee break';
    }

    workDirectorTasks(): string {
        return 'Getting to director tasks';
    }
}

// 4. Implement the Teacher class
class Teacher implements TeacherInterface {
    workFromHome(): string {
        return 'Cannot work from home';
    }

    getCoffeeBreak(): string {
        return 'Cannot have a break';
    }

    workTeacherTasks(): string {
        return 'Getting to work';
    }
}

// 5. Create the createEmployee function
function createEmployee(salary: number | string): Director | Teacher {
    if (typeof salary === 'number' && salary < 500) {
        return new Teacher();
    }
    return new Director();
}

// Test the createEmployee function
console.log(createEmployee(200) instanceof Teacher); // true
console.log(createEmployee(1000) instanceof Director); // true
console.log(createEmployee('$500') instanceof Director); // true

// 6. Define the isDirector function
function isDirector(employee: Director | Teacher): employee is Director {
    return employee instanceof Director;
}

// 7. Define the executeWork function
function executeWork(employee: Director | Teacher): void {
    if (isDirector(employee)) {
        console.log(employee.workDirectorTasks());
    } else {
        console.log(employee.workTeacherTasks());
    }
}

// Test the executeWork function
executeWork(createEmployee(200)); // Getting to work
executeWork(createEmployee(1000)); // Getting to director tasks

// 8. Define the Subjects type and teachClass function
type Subjects = 'Math' | 'History';

function teachClass(todayClass: Subjects): string {
    if (todayClass === 'Math') {
        return 'Teaching Math';
    } else if (todayClass === 'History') {
        return 'Teaching History';
    }
    throw new Error('Invalid subject');
}

// Test the teachClass function
console.log(teachClass('Math')); // Teaching Math
console.log(teachClass('History')); // Teaching History

