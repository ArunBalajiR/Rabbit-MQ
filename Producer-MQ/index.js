const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Producer = require('./producer');
const producer = new Producer();

app.use(bodyParser.json("application/json"));

app.post("/sendData",async (req,res,next) => {
    //documentTitle,documentDesc,documentDomain,routingKey,url
    await producer.publishMessage(
        req.body.documentTitle,
        req.body.documentDesc,
        req.body.documentDomain,
        req.body.fileType, 
        req.body.documentUrl);
    res.send({
        message : "Added to fileExchangeQueue",
    });
});


const PORT = 3500;
app.listen(3500, ()=>{
    console.log(`App Listening on port ${PORT}`);
})