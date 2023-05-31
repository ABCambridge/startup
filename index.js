const express = require('express');
//example also requires 'cookie-parser'
const app = express();

app.use(express.static('public'));

const port = 4000;
app.listen(port,function (){ 
    console.log(`Listening on port ${port}`);
});