import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [search])

  const fetchProducts = async () => {
    try {
      const params = search ? { search } : {}
      const response = await axios.get('/api/products', { params })
      setProducts(response.data.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
          <p className="mt-2 text-sm text-gray-700">
            Lista de todos los productos disponibles
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-4 py-2 border"
        />
      </div>

      {/* Products Table */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marca
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.nombre}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.marca}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${parseFloat(product.precio).toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock || 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
