// import { Kafka } from 'kafkajs'
const { Kafka } = require('kafkajs');
const Trip = require('./schemas/Trip');

const kafka = new Kafka({
  clientId: 'my-consumer-app',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'test-group' });

async function consumeMessages() {
  try {
    await consumer.connect();
    console.log('✅ Consumer connected');

    await consumer.subscribe({ topic: 'quickstart-events', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {

        console.log(`📩 Received message: ${message.value.toString()}`);
        const tripJSON = JSON.parse(message.value);

        const newTrip = new Trip({
            title: tripJSON.title,
            description: tripJSON.description,
            price: tripJSON.price,
            startDate : tripJSON.starDate,
            endDate: tripJSON.endDate
        })
        // const newTrip = new Trip(req.body);
        await newTrip.save();  
        console.log(`   Key: ${message.key?.toString()} | Partition: ${partition}`);
      },
    });
  } catch (error) {
    console.error('❌ Error consuming message:', error);
  }
}

// consumeMessages();

module.exports = consumeMessages;
