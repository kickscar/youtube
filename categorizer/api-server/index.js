import app from './config/app.js';
import mongo from './config/mongo.js';

// check if main module (for mocha test)
process.mainModule === undefined && app.listen(app.config.port, () => {
    console.info(`starts API server on port ${app.config.port} - mode:${app.config.env}`);
});

export default app;