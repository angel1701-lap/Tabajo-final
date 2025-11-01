import { Router } from 'express'

const router = Router()

router.get('/predict', async (req, res) => {
  const { productId } = req.query
  res.json({ productId: productId ?? null, prediction: 0 })
})

export default router
