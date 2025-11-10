import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

function Dashboard() {
  // Datos simulados para el Dashboard
  const productosTop = [
    { nombre: 'Nike Air Zoom', ventas: 480 },
    { nombre: 'Adidas Ultraboost', ventas: 420 },
    { nombre: 'Puma RS-X', ventas: 380 },
    { nombre: 'New Balance 574', ventas: 340 },
    { nombre: 'Converse All Star', ventas: 300 },
  ];

  const ventasMensuales = [
    { mes: 'Enero', total: 200 },
    { mes: 'Febrero', total: 220 },
    { mes: 'Marzo', total: 270 },
    { mes: 'Abril', total: 310 },
    { mes: 'Mayo', total: 340 },
    { mes: 'Junio', total: 360 },
    { mes: 'Julio', total: 390 },
    { mes: 'Agosto', total: 420 },
    { mes: 'Septiembre', total: 450 },
    { mes: 'Octubre', total: 480 },
    { mes: 'Noviembre', total: 500 },
    { mes: 'Diciembre', total: 530 },
  ];

  // Configuración del gráfico de productos más vendidos
  const dataBarras = {
    labels: productosTop.map(p => p.nombre),
    datasets: [
      {
        label: 'Unidades Vendidas',
        data: productosTop.map(p => p.ventas),
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Configuración del gráfico de ventas mensuales
  const dataLineas = {
    labels: ventasMensuales.map(v => v.mes),
    datasets: [
      {
        label: 'Total de Ventas (S/)',
        data: ventasMensuales.map(v => v.total),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container my-5">
      <h2 className="text-center fw-bold mb-4"> Dashboard de Ventas</h2>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="text-center mb-3 fw-bold">Top 5 Productos Más Vendidos</h5>
            <Bar data={dataBarras} />
          </div>
        </div>

        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5 className="text-center mb-3 fw-bold">Ventas Mensuales Totales</h5>
            <Line data={dataLineas} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
