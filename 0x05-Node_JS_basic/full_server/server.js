import express from 'express';
import router from './routes';

const app = express();
const PORT = 1245;

app.locals.databaseFile = process.argv[2]; // قاعدة البيانات تمر كمعامل
app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
