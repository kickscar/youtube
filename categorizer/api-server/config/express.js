import express from 'express';
import cors from 'cors';
import routes from '../routes/index.js';

const app = express();


// CORS Enabled
app.use(cors());

// Mount routes with begin of '/api'
app.use('/api', routes);


export default app;