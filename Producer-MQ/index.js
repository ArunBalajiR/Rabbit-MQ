const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Producer = require('./producer');
const producer = new Producer();

app.use(bodyParser.json("application/json"));

app.post("/sendData",async (req,res,next) => {
    await producer.publishMessage(req.body.fileType, req.body.url);
    res.send();
});


const PORT = 3000;
app.listen(3000, ()=>{
    console.log(`App Listening on port ${PORT}`);
})