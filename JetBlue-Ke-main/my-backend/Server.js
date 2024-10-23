import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

const port = 3000
const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const tenantId = process.env.TENANT_ID

const authority = `https://login.microsoftonline.com/${tenantId}`
const tokenEndpoint = `${authority}/oauth2/v2.0/token`

async function getAccessToken() {
  const formData = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'https://graph.microsoft.com/.default',
    grant_type: 'client_credentials',
  })

  try {
    const response = await axios.post(tokenEndpoint, formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return response.data.access_token
  } catch (error) {
    console.error('Error fetching access token:', error)
    throw new Error('Unable to retrieve access token')
  }
}
