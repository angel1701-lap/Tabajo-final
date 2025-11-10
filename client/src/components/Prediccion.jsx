import React, { useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar los componentes del gráfico
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Prediccion() {
  const [mes, setMes] = useState('');
  const [prediccion, setPrediccion] = useState(null);
  const [modeloEntrenado, setModeloEntrenado] = useState(null);

  // Datos históricos de ejemplo (mes vs ventas)
  const datos = [
    { mes: 1, ventas: 200 },
    { mes: 2, ventas: 220 },
    { mes: 3, ventas: 270 },
    { mes: 4, ventas: 300 },
    { mes: 5, ventas: 330 },
    { mes: 6, ventas: 350 },
    { mes: 7, ventas: 370 },
    { mes: 8, ventas: 400 },
    { mes: 9, ventas: 420 },
    { mes: 10, ventas: 460 },
    { mes: 11, ventas: 480 },
    { mes: 12, ventas: 500 },
  ];

  // Entrenar el modelo al cargar el componente
  useEffect(() => {
    const entrenarModelo = async () => {
      const modelo = tf.sequential();
      modelo.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      modelo.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

      const xs = tf.tensor1d(datos.map((d) => d.mes));
      const ys = tf.tensor1d(datos.map((d) => d.ventas));

      await modelo.fit(xs, ys, { epochs: 200 });

      setModeloEntrenado(modelo);
    };

    entrenarModelo();
  }, []);

  // Calcular predicción
  const predecirVenta = async () => {
    if (!modeloEntrenado || !mes) return;
    const input = tf.tensor1d([parseFloat(mes)]);
    const output = modeloEntrenado.predict(input);
    const valor = (await output.data())[0].toFixed(2);
    setPrediccion(valor);
  };

  // Datos del gráfico
  const dataChart = {
    labels: datos.map((d) => `Mes ${d.mes}`),
    datasets: [
      {
        label: 'Ventas históricas',
        data: datos.map((d) => d.ventas),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold"> Predicción de Ventas Mensuales</h2>

      <div className="card p-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label fw-bold">Selecciona el número de mes:</label>
          <select
            className="form-select"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
          >
            <option value="">-- Selecciona un mes --</option>
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Mes {i + 1}
              </option>
            ))}
          </select>
        </div>

        <button className="btn btn-primary w-100 mb-3" onClick={predecirVenta}>
          Predecir ventas
        </button>

        {prediccion && (
          <div className="alert alert-success text-center">
            <h5>Predicción estimada para el mes {mes}:</h5>
            <h3>S/ {prediccion}</h3>
          </div>
        )}
      </div>

      <div className="mt-5">
        <h4 className="text-center">Tendencia de Ventas</h4>
        <Line data={dataChart} />
      </div>
    </div>
  );
}

export default Prediccion;
