// task_4/js/subjects/Java.ts

namespace Subjects {
    // Adding optional attribute to Teacher interface
    export interface Teacher {
        experienceTeachingJava?: number;
    }

    export class Java extends Subject {
        getRequirements(): string {
            return 'Here is the list of requirements for Java';
        }

        getAvailableTeacher(): string {
            return this.teacher.experienceTeachingJava ? 
                `Available Teacher: ${this.teacher.firstName}` : 
                'No available teacher';
        }
    }
}
