const amqp = require('amqplib');
const config = require('./config');
// step 1 : connect to rabbit mq server
// step 2 : create a new channel
// step 3 : create the exchange
// step 4 : create the queue
// step 5 : bind the   queue
// step 6 : Consume messages from queue

async function consumeMessages(){
    const connection = await amqp.connect(config.rabbitMQ.url);
    const channel = await connection.createChannel();

    await channel.assertExchange("fileExchange","direct");
    const q = await channel.assertQueue("ocrDoc");
    
    await channel.bindQueue(q.queue, "fileExchange", "doc");

    channel.consume(q.queue, (msg)=>{
        const data = JSON.parse(msg.content);
        console.log(data);
        channel.ack(msg);
    })
}

consumeMessages();