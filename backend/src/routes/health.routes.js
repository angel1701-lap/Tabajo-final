import { Router } from 'express'
import pool from '../config/database.js'

const router = Router()

router.get('/health', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok')
    res.json({
      success: true,
      status: 'healthy',
      database: rows?.[0]?.ok === 1 ? 'connected' : 'disconnected',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(503).json({
      success: false,
      status: 'unhealthy',
      database: 'disconnected',
      error: error.message
    })
  }
})

export default router
