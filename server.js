import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import routes from './routes/tasks.js';
import dotenv from 'dotenv';

// This will look for .env file in root folder and add it to process environment
if (process.env.NODE_ENV !== 'production') dotenv.config();

const app = express();

//Production environment port after build or port 5000 during development
const port = process.env.PORT || 5000;

app.use(express.json());

//Allows cross origin requests
app.use(cors());

//Connect to MongoDB atlas database
const username = process.env.ADMIN;
const password = process.env.PASSWORD;
const CONNECTION_URL = `mongodb+srv://${username}:${password}@cluster0.et5sq.mongodb.net/ticktaskDB?retryWrites=true&w=majority`;
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(port, () => {
        console.log(`Server connected to Database and running on port: ${port}`)
    }))
    .catch((error) => console.log(error.message));

//Routes handling
app.use('/tasks', routes);

//Error handling middleware
app.use((err, req, res, next) => {
    res.status(422).send({ error: err.message })
});

