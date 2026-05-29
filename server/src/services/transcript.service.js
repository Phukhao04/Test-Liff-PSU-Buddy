const axios = require('axios')

module.exports = async (app, options) => {
  app.get('/activity-check', async (req, res) => {
    try {
      const activity = await axios.get(
        'https://transcript.psu.ac.th/transcript_api/api/student_events/6610210312',
        {
          headers: {
            token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoibGluZW9hLml0a29uZ2tpdC5wc3UuYWMudGgifQ.EqZqHvoThfX5d4zp7i1XHP9ItvR9ghehuX95buA65jA`,
          },
        },
      )

      return res.send(activity.data)
    } catch (error) {
      console.log(error)
      return res.status(500).send({
        message: 'Internal Server Error',
      })
    }
  })
}