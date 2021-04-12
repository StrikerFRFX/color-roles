const Client = require('./src/client.js');
require('dotenv').config();

const client = new Client();

if (process.env.TOKEN) client.start(process.env.TOKEN);
else {
    const { token } = require('./config.js');
    client.start(token);
}