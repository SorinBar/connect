import express from 'express';
import router from './routes/router';
import logger from './middlewares/logger';
import { Database } from '../db-layer/database';
import { ExitCodes } from '../db-layer/utils/codes';
import cors from 'cors';

const connected = Database.connect();
if (!connected) {
    process.exit(ExitCodes.DbConnect);
}

const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger);

app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
