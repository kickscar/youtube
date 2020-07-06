import app from './config/app.js';
import mongo from './config/mongo.js';

console.log(mongo.config);

// module.parent check is required to support mocha watch
// src: https://github.com/mochajs/mocha/issues/1912
if (typeof module === 'undefined' || !module.parent) {
    // listen on port config.port
    app.listen(app.config.port, () => {
        console.info(`starts API server on port ${app.config.port} - mode:${app.config.env}`);
    });
}