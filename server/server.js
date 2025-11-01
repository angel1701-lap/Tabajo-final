import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import predictionRoutes from './routes/prediction.routes.js'
import salesRoutes from './routes/sales.routes.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api', predictionRoutes)
app.use('/api', salesRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`)
})
