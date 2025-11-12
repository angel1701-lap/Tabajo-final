import { Router } from 'express'
import pool from '../config/database.js'
import { AppError } from '../middlewares/errorHandler.js'

const router = Router()

// GET /api/products - Obtener todos los productos
router.get('/', async (req, res, next) => {
  try {
    const { limit = 100, offset = 0, marca, search } = req.query
    
    let query = 'SELECT * FROM productos WHERE 1=1'
    const params = []
    
    if (marca) {
      query += ' AND marca = ?'
      params.push(marca)
    }
    
    if (search) {
      query += ' AND (nombre LIKE ? OR marca LIKE ?)'
      params.push(`%${search}%`, `%${search}%`)
    }
    
    query += ' ORDER BY id DESC LIMIT ? OFFSET ?'
    params.push(parseInt(limit), parseInt(offset))
    
    const [rows] = await pool.query(query, params)
    
    res.json({
      success: true,
      count: rows.length,
      data: rows
    })
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:id - Obtener producto por ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id])
    
    if (rows.length === 0) {
      throw new AppError('Producto no encontrado', 404)
    }
    
    res.json({
      success: true,
      data: rows[0]
    })
  } catch (error) {
    next(error)
  }
})

// GET /api/products/brands - Obtener marcas únicas
router.get('/meta/brands', async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT DISTINCT marca FROM productos ORDER BY marca')
    
    res.json({
      success: true,
      data: rows.map(row => row.marca)
    })
  } catch (error) {
    next(error)
  }
})

export default router
