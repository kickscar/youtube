import app from './config/app.js';
import mongo from './config/mongo.js';

// check if main module (for mocha test)
if (process.mainModule === undefined) {
    // listen on port config.port
    app.listen(app.config.port, () => {
        console.info(`starts API server on port ${app.config.port} - mode:${app.config.env}`);
    });
}

export default app;