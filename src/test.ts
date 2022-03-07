require('dotenv').config({ path: '../.env' });
let index = require('./index.ts');
(async () => {
    await index.handler(
    );
})();