// task_4/js/subjects/React.ts

namespace Subjects {
    // Adding optional attribute to Teacher interface
    export interface Teacher {
        experienceTeachingReact?: number;
    }

    export class React extends Subject {
        getRequirements(): string {
            return 'Here is the list of requirements for React';
        }

        getAvailableTeacher(): string {
            return this.teacher.experienceTeachingReact ? 
                `Available Teacher: ${this.teacher.firstName}` : 
                'No available teacher';
        }
    }
}
