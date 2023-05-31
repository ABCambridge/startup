const express = require('express');
//example also requires 'cookie-parser'
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.get('/login',(req,res) => {
    res.send({"message":"complete"});
});

const port = 4000;
app.listen(port,function (){ 
    console.log(`Listening on port ${port}`);
});