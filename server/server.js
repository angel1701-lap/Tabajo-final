import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import predictionRoutes from './routes/prediction.routes.js'
import salesRoutes from './routes/sales.routes.js'
import pool from './config/db.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.get('/api/db-health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok')
    res.json({ status: 'ok', db: rows?.[0]?.ok === 1 ? 'connected' : 'unknown' })
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected', message: err.message })
  }
})

app.use('/api', predictionRoutes)
app.use('/api', salesRoutes)

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal Server Error' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
