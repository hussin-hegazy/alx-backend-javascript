// task_5/js/main.ts

interface MajorCredits {
    credits: number;
    brand: 'Major';
}

interface MinorCredits {
    credits: number;
    brand: 'Minor';
}

// Function to sum MajorCredits
function sumMajorCredits(subject1: MajorCredits, subject2: MajorCredits): MajorCredits {
    return {
        credits: subject1.credits + subject2.credits,
        brand: 'Major'
    };
}

// Function to sum MinorCredits
function sumMinorCredits(subject1: MinorCredits, subject2: MinorCredits): MinorCredits {
    return {
        credits: subject1.credits + subject2.credits,
        brand: 'Minor'
    };
}

// Example usage (optional)
const major1: MajorCredits = { credits: 5, brand: 'Major' };
const major2: MajorCredits = { credits: 3, brand: 'Major' };
const minor1: MinorCredits = { credits: 2, brand: 'Minor' };
const minor2: MinorCredits = { credits: 4, brand: 'Minor' };

console.log(sumMajorCredits(major1, major2)); // { credits: 8, brand: 'Major' }
console.log(sumMinorCredits(minor1, minor2)); // { credits: 6, brand: 'Minor' }
