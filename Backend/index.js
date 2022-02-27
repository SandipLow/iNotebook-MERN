const connectToMongo = require('./db')
const express = require('express')

// Connecting to the db
connectToMongo()

const app = express();
const port = 5000;

app.use(express.json())

// // Routes for the app
app.get('/', (req, res)=>{
    res.send('Hello Express...!!');
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
