import { useState, useEffect } from 'react'
import axios from 'axios'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [summary, setSummary] = useState(null)
  const [topProducts, setTopProducts] = useState([])
  const [monthlySales, setMonthlySales] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [summaryRes, topProductsRes, monthlyRes] = await Promise.all([
        axios.get('/api/sales/summary'),
        axios.get('/api/sales/top-products?limit=5'),
        axios.get('/api/sales/monthly')
      ])

      setSummary(summaryRes.data.data)
      setTopProducts(topProductsRes.data.data)
      setMonthlySales(monthlyRes.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Cargando...</div>
  }

  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Total Órdenes
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {summary?.totalOrders || 0}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Unidades Vendidas
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  {summary?.totalUnits || 0}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Ingresos Totales
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  ${summary?.totalRevenue?.toFixed(2) || 0}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-1">
                <dt className="text-sm font-medium text-gray-500 truncate">
                  Valor Promedio
                </dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">
                  ${summary?.avgOrderValue?.toFixed(2) || 0}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Top 5 Productos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nombre" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="totalSold" fill="#3b82f6" name="Unidades Vendidas" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Ventas Mensuales
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="monthName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalRevenue" stroke="#10b981" name="Ingresos" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
