import { Router } from 'express'
import pool from '../config/database.js'

const router = Router()

// GET /api/sales - Obtener todas las ventas
router.get('/', async (req, res, next) => {
  try {
    const { limit = 100, offset = 0, startDate, endDate } = req.query
    
    let query = `
      SELECT v.*, p.nombre, p.marca 
      FROM ventas v
      JOIN productos p ON v.producto_id = p.id
      WHERE 1=1
    `
    const params = []
    
    if (startDate) {
      query += ' AND v.fecha >= ?'
      params.push(startDate)
    }
    
    if (endDate) {
      query += ' AND v.fecha <= ?'
      params.push(endDate)
    }
    
    query += ' ORDER BY v.fecha DESC LIMIT ? OFFSET ?'
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

// GET /api/sales/summary - Resumen de ventas
router.get('/summary', async (req, res, next) => {
  try {
    const query = `
      SELECT 
        COUNT(*) AS totalOrders,
        SUM(cantidad) AS totalUnits,
        SUM(cantidad * precio_unitario) AS totalRevenue,
        AVG(cantidad * precio_unitario) AS avgOrderValue
      FROM ventas
    `
    
    const [rows] = await pool.query(query)
    
    res.json({
      success: true,
      data: {
        totalOrders: parseInt(rows[0].totalOrders) || 0,
        totalUnits: parseInt(rows[0].totalUnits) || 0,
        totalRevenue: parseFloat(rows[0].totalRevenue) || 0,
        avgOrderValue: parseFloat(rows[0].avgOrderValue) || 0
      }
    })
  } catch (error) {
    next(error)
  }
})

// GET /api/sales/top-products - Productos más vendidos
router.get('/top-products', async (req, res, next) => {
  try {
    const { limit = 10 } = req.query
    
    const query = `
      SELECT 
        p.id,
        p.nombre,
        p.marca,
        p.precio,
        SUM(v.cantidad) AS totalSold,
        SUM(v.cantidad * v.precio_unitario) AS totalRevenue
      FROM productos p
      JOIN ventas v ON p.id = v.producto_id
      GROUP BY p.id, p.nombre, p.marca, p.precio
      ORDER BY totalSold DESC
      LIMIT ?
    `
    
    const [rows] = await pool.query(query, [parseInt(limit)])
    
    res.json({
      success: true,
      count: rows.length,
      data: rows
    })
  } catch (error) {
    next(error)
  }
})

// GET /api/sales/monthly - Ventas mensuales
router.get('/monthly', async (req, res, next) => {
  try {
    const { year = new Date().getFullYear(), months = 12 } = req.query
    
    const query = `
      SELECT 
        DATE_FORMAT(fecha, '%Y-%m') AS month,
        MONTHNAME(fecha) AS monthName,
        COUNT(*) AS totalOrders,
        SUM(cantidad) AS totalUnits,
        SUM(cantidad * precio_unitario) AS totalRevenue
      FROM ventas
      WHERE YEAR(fecha) = ?
      GROUP BY month, monthName
      ORDER BY month ASC
      LIMIT ?
    `
    
    const [rows] = await pool.query(query, [parseInt(year), parseInt(months)])
    
    res.json({
      success: true,
      year: parseInt(year),
      count: rows.length,
      data: rows
    })
  } catch (error) {
    next(error)
  }
})

// GET /api/sales/by-brand - Ventas por marca
router.get('/by-brand', async (req, res, next) => {
  try {
    const query = `
      SELECT 
        p.marca,
        COUNT(*) AS totalOrders,
        SUM(v.cantidad) AS totalUnits,
        SUM(v.cantidad * v.precio_unitario) AS totalRevenue
      FROM ventas v
      JOIN productos p ON v.producto_id = p.id
      GROUP BY p.marca
      ORDER BY totalRevenue DESC
    `
    
    const [rows] = await pool.query(query)
    
    res.json({
      success: true,
      count: rows.length,
      data: rows
    })
  } catch (error) {
    next(error)
  }
})

export default router
