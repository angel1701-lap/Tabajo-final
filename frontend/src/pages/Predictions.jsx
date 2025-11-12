import { useState, useEffect } from 'react'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Predictions() {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState('')
  const [months, setMonths] = useState(3)
  const [predictions, setPredictions] = useState(null)
  const [loading, setLoading] = useState(false)
  const [modelInfo, setModelInfo] = useState(null)

  useEffect(() => {
    fetchProducts()
    fetchModelInfo()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products?limit=50')
      setProducts(response.data.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  const fetchModelInfo = async () => {
    try {
      const response = await axios.get('/api/predictions/model-info')
      setModelInfo(response.data.data)
    } catch (error) {
      console.error('Error fetching model info:', error)
    }
  }

  const handlePredict = async () => {
    if (!selectedProduct) {
      alert('Selecciona un producto')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/predictions/predict', {
        productId: selectedProduct,
        months: parseInt(months)
      })
      setPredictions(response.data.data)
    } catch (error) {
      console.error('Error predicting:', error)
      alert('Error al generar predicción')
    } finally {
      setLoading(false)
    }
  }

  const handleTrain = async () => {
    if (!confirm('¿Entrenar el modelo? Esto puede tomar varios minutos.')) {
      return
    }

    setLoading(true)
    try {
      await axios.post('/api/predictions/train')
      alert('Modelo entrenado exitosamente')
      fetchModelInfo()
    } catch (error) {
      console.error('Error training:', error)
      alert('Error al entrenar el modelo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Predicciones de Ventas
      </h2>

      {/* Model Info */}
      {modelInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            Estado del Modelo
          </h3>
          <p className="text-sm text-blue-700">
            {modelInfo.trained ? (
              <>
                ✅ Modelo entrenado el {new Date(modelInfo.trained_at).toLocaleString()}
              </>
            ) : (
              <>⚠️ Modelo no entrenado</>
            )}
          </p>
        </div>
      )}

      {/* Prediction Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Producto
            </label>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
            >
              <option value="">Seleccionar producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.nombre} - {product.marca}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meses a predecir
            </label>
            <input
              type="number"
              min="1"
              max="12"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-3 py-2 border"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={handlePredict}
              disabled={loading}
              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? 'Procesando...' : 'Predecir'}
            </button>
            <button
              onClick={handleTrain}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400"
            >
              Entrenar
            </button>
          </div>
        </div>
      </div>

      {/* Predictions Results */}
      {predictions && (
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Resultados de Predicción
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={predictions.predictions}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="predicted_quantity"
                stroke="#3b82f6"
                name="Cantidad Predicha"
              />
              <Line
                type="monotone"
                dataKey="predicted_revenue"
                stroke="#10b981"
                name="Ingresos Predichos"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Mes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Cantidad Predicha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ingresos Predichos
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {predictions.predictions.map((pred, idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pred.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {pred.predicted_quantity.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${pred.predicted_revenue.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
