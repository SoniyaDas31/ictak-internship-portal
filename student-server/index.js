
const express = require('express');
const connectDB = require('./db.js');
const itemModal = require('./models/items.js');
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.get('/', async (req, res) => {
    const response = await itemModal.find();
    return res.json({items: response});
    
});


app.listen(3000, () => {
    console.log('App is running');
    console.log('cors', cors());
    console.log('JSON', express.json());
});

