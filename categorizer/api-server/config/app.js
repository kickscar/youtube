import express from 'express';
import cors from 'cors';
import Joi from '@hapi/joi';
import dotenv from 'dotenv';
import routes from '../routes/index.js';

// Express Application
const app = express();

// dotenv Will Load Environment Variables in PROCESS.ENV Through .env
dotenv.config();

// Validation Environment Variables
const {error, value} = Joi.object({
    NODE_ENV: Joi.string().allow('development', 'production', 'test', 'provision').default('development'),
    PORT: Joi.number().default(9090),
    JWT_SECRET: Joi.string().required().description('JWT Secret required to sign')
}).unknown().required().validate(process.env);

if (error) {
    throw new Error(`Error App Configuration: ${error.message}`);
}

// Set Application Configuratuion to app
app.config = {
    env: value.NODE_ENV,
    port: value.PORT,
    jwtSecret: value.JWT_SECRET
};

// CORS Enabled
app.use(cors());

// Mount routes with begin of '/api'
app.use('/api', routes);


export default app;