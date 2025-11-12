import { Router } from 'express'
import axios from 'axios'
import pool from '../config/database.js'
import { AppError } from '../middlewares/errorHandler.js'

const router = Router()
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5000'

// POST /api/predictions/predict - Predecir ventas
router.post('/predict', async (req, res, next) => {
  try {
    const { productId, months = 3 } = req.body
    
    if (!productId) {
      throw new AppError('productId es requerido', 400)
    }
    
    // Obtener datos históricos del producto
    const [salesData] = await pool.query(
      `SELECT fecha, cantidad, precio_unitario 
       FROM ventas 
       WHERE producto_id = ? 
       ORDER BY fecha DESC 
       LIMIT 100`,
      [productId]
    )
    
    if (salesData.length === 0) {
      throw new AppError('No hay datos históricos para este producto', 404)
    }
    
    // Llamar al servicio ML
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/api/predict`, {
      productId,
      salesData,
      months
    })
    
    res.json({
      success: true,
      data: mlResponse.data
    })
  } catch (error) {
    if (error.response) {
      next(new AppError(error.response.data.error || 'Error en servicio ML', error.response.status))
    } else {
      next(error)
    }
  }
})

// POST /api/predictions/train - Entrenar modelo
router.post('/train', async (req, res, next) => {
  try {
    // Obtener todos los datos de ventas
    const [salesData] = await pool.query(`
      SELECT v.*, p.nombre, p.marca, p.precio
      FROM ventas v
      JOIN productos p ON v.producto_id = p.id
      ORDER BY v.fecha ASC
    `)
    
    // Llamar al servicio ML para entrenar
    const mlResponse = await axios.post(`${ML_SERVICE_URL}/api/train`, {
      salesData
    })
    
    res.json({
      success: true,
      data: mlResponse.data
    })
  } catch (error) {
    if (error.response) {
      next(new AppError(error.response.data.error || 'Error en servicio ML', error.response.status))
    } else {
      next(error)
    }
  }
})

// GET /api/predictions/model-info - Información del modelo
router.get('/model-info', async (req, res, next) => {
  try {
    const mlResponse = await axios.get(`${ML_SERVICE_URL}/api/model/info`)
    
    res.json({
      success: true,
      data: mlResponse.data
    })
  } catch (error) {
    if (error.response) {
      next(new AppError(error.response.data.error || 'Error en servicio ML', error.response.status))
    } else {
      next(error)
    }
  }
})

export default router
