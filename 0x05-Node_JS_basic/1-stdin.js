
process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('data', (input) => {
    const name = input.toString().trim(); // إزالة المسافات البيضاء
    process.stdout.write(`Your name is: ${name}\n`);
    process.exit(); // إنهاء البرنامج
});

process.on('exit', () => {
    process.stdout.write('This important software is now closing\n');
});
