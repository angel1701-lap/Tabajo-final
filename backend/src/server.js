import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { errorHandler } from './middlewares/errorHandler.js'
import productRoutes from './routes/product.routes.js'
import salesRoutes from './routes/sales.routes.js'
import predictionRoutes from './routes/prediction.routes.js'
import healthRoutes from './routes/health.routes.js'

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', healthRoutes)
app.use('/api/products', productRoutes)
app.use('/api/sales', salesRoutes)
app.use('/api/predictions', predictionRoutes)

// Error handler
app.use(errorHandler)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`)
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
})
