import Joi from '@hapi/joi';
import dotenv from 'dotenv';

// dotenv Will Load Environment Variables in PROCESS.ENV Through .env
dotenv.config();

// Validation Environment Variables
const {error, value} = Joi.object({
    MONGOOSE_DEBUG: Joi.boolean().when('NODE_ENV', {
        is: Joi.string().equal('development'),
        then: Joi.boolean().default(true),
        otherwise: Joi.boolean().default(false)
    }),
    MONGO_HOST: Joi.string().required().description('Mongo DB host url'),
    MONGO_PORT: Joi.number().default(27017),
    MONGO_CONNECTIONTIMEOUT: Joi.number().default(5000)
}).unknown().required().validate(process.env);

const config = {
    mongooseDebug: value.MONGOOSE_DEBUG,
    host: value.MONGO_HOST,
    port: value.MONGO_PORT,
    options: {
        useNewUrlParser: true,
        connectTimeoutMS: value.MONGO_CONNECTIONTIMEOUT
    }
};

export default { config }