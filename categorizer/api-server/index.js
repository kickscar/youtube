import app from './config/express.js';

const PORT = 9090;

app
    .listen(PORT, () => console.log('starts API server on port ' + PORT));