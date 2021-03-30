const express = require('express')

const routes = require('./routes')

const app = express()

app.use(express.json())

app.use('/api', routes)

app.get('*', (req, res) => {
    res.status(404).json({
        message: "Error link not found"
    })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log('we are running on PORT: ' + PORT))