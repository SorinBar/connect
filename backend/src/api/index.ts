import express from 'express';
import router from './routes/router';
import logger from './middlewares/logger';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
