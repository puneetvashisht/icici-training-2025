const express = require('express');
const app = express();
const router = express.Router()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Trip = require('./schemas/Trip');
const cors = require('cors');
const requestTime = require('./middlewares/requestTimeLog');
var colors = require('@colors/colors');
const eurekaClient = require('./connect');
const consumer = require('./consumer')
eurekaClient.start(function(error) {
  console.log(error || 'Eureka registration complete');
});

consumer();


async function connectToDb() {
  await mongoose.connect('mongodb://127.0.0.1:27017/icici_db');
    console.log('Connected to MongoDB'.green);
}
connectToDb();


// chain of middlewares
app.use(bodyParser.json());
app.use(cors());
app.use(requestTime)



app.use('/api', require('./routes/Trip'));
app.use('/api', require('./routes/Itinerary'));
app.use('/api', require('./routes/Activity'));

app.get('/', (req, res) => {
    res.send('Hello World Change!');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});