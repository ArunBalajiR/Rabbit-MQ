const amqp = require('amqplib');
const config = require('./config');

//step 1 : Connect to rabbitMQ Server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message with the routing key with example

class Producer{
    
    channel;

    async createChannel(){
        const connection = await amqp.connect(config.rabbitMQ.url);
        this.channel = await connection.createChannel();

    }

    async publishMessage(documentTitle,documentDesc,documentDomain,routingKey,url){
        if(!this.channel){
            await this.createChannel();
        }
        const exchangeName = config.rabbitMQ.exchangeName;
        await this.channel.assertExchange(exchangeName);

        const logDetails = {
            fileType : routingKey,
            documentUrl : url,
            documentTitle: documentTitle,
            documentDesc: documentDesc,
            documentContent : "",
            documentDomain: documentDomain
        };
        await this.channel.publish(exchangeName, routingKey,Buffer.from(
            JSON.stringify(logDetails)
        ));

        console.log(`The url ${url} is sent to exchange ${exchangeName}`);

    }
}

module.exports = Producer;