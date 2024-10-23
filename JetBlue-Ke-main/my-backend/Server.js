import express from 'express'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const app = express()
app.use(express.json())

const port = 3000
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const tenantId = process.env.TENANT_ID

const authority = `https://login.microsoftonline.com/${tenantId}`
const tokenEndpoint = `${authority}/oauth2/v2.0/token`

app.post('/get-token', async (req, res) => {
  try {
    const response = await axios.post(tokenEndpoint, null, {
      params: {
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials',
      },
    })
    res.json(response.data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})