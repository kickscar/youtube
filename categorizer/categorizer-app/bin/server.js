const path =  require('path');
const express = require('express');

const PORT = 9090;

express()
    .use('/', express.static(path.resolve('.', 'public')))
    .listen(PORT, () => console.log('starts categorizer app on port ' + PORT));