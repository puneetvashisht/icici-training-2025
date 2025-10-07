// import { Kafka } from 'kafkajs';
const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'my-producer-app',
  brokers: ['localhost:9092'], // update with your broker(s)
});

const producer = kafka.producer();

async function produceMessage() {
  try {
    await producer.connect();
    console.log('✅ Producer connected');

    const result = await producer.send({
      topic: 'quickstart-events',
      messages: [
        { key: 'msg1', value: 'Hello Kafka from NodeJS 🚀' },
        { key: 'msg2', value: 'Another message' },
      ],
    });

    console.log('📤 Message sent:', result);
  } catch (error) {
    console.error('❌ Error producing message:', error);
  } finally {
    await producer.disconnect();
  }
}

produceMessage();
