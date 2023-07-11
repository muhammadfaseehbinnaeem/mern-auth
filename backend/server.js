import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';

import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Server is ready.'));

app.use(notFound);
app.use(errorHandler);

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mernauth.rxboaol.mongodb.net/${process.env.DB_NAME}`
    )
    .then(() => {
        app.listen(port, () => console.log(`Server has started on ${port}.`));
    })
    .catch((err) => {
        console.log(err);
    });