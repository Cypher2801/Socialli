const express = require('express');
const router = require('./router');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log(`Server Running on ${port}`);
});

app.get('/', (req, res) => {
    res.send('Server Running!');
});


app.use('/api', router);