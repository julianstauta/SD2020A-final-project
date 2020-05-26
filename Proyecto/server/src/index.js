const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(cors());

const names = require('./routes/api/names');

app.use('/api/names', names);

const port  = process.env.PORT || 5000
const HOST = '0.0.0.0';

//app.listen(port, '192.168.56.3', () => console.log(`Server started on port ${port}`));
app.listen(port, HOST);
console.log(`Running on http://${HOST}:${port}`);