const express = require('express')
const cors = require('cors')

const activityRoute = require('./routes/activity.route')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', activityRoute)

app.get('/', (req, res) => {
  res.send('Backend Running')
})

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})