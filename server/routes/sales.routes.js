import { Router } from 'express'

const router = Router()

router.get('/top-products', async (req, res) => {
  res.json({ items: [] })
})

router.get('/monthly-sales', async (req, res) => {
  res.json({ months: [], values: [] })
})

export default router
