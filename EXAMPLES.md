# Ejemplos de Uso

## API Backend

### 1. Obtener resumen de ventas
```bash
curl http://localhost:3000/api/sales/summary
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "totalOrders": 200,
    "totalUnits": 850,
    "totalRevenue": 95432.50,
    "avgOrderValue": 477.16
  }
}
```

### 2. Top 5 productos más vendidos
```bash
curl "http://localhost:3000/api/sales/top-products?limit=5"
```

### 3. Ventas mensuales del 2024
```bash
curl "http://localhost:3000/api/sales/monthly?year=2024"
```

### 4. Buscar productos
```bash
curl "http://localhost:3000/api/products?search=Nike"
```

### 5. Predecir ventas de un producto
```bash
curl -X POST http://localhost:3000/api/predictions/predict \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "months": 3
  }'
```

Respuesta:
```json
{
  "success": true,
  "data": {
    "productId": 1,
    "months": 3,
    "predictions": [
      {
        "month": "2024-12",
        "predicted_quantity": 45.2,
        "predicted_revenue": 5874.80
      },
      {
        "month": "2025-01",
        "predicted_quantity": 48.7,
        "predicted_revenue": 6330.13
      },
      {
        "month": "2025-02",
        "predicted_quantity": 42.1,
        "predicted_revenue": 5472.99
      }
    ]
  }
}
```

## Frontend

### Navegación
1. **Dashboard** (`/`) - Vista general con métricas y gráficos
2. **Productos** (`/products`) - Lista de productos con búsqueda
3. **Predicciones** (`/predictions`) - Herramienta de predicción ML

### Flujo de predicción
1. Seleccionar un producto del dropdown
2. Elegir número de meses (1-12)
3. Click en "Predecir"
4. Ver resultados en gráfico y tabla

### Entrenar modelo
1. Ir a página de Predicciones
2. Click en botón "Entrenar"
3. Esperar confirmación
4. El modelo estará listo para predicciones

## ML Service

### 1. Verificar estado del modelo
```bash
curl http://localhost:5000/api/model/info
```

### 2. Entrenar modelo directamente
```bash
curl -X POST http://localhost:5000/api/train \
  -H "Content-Type: application/json" \
  -d '{
    "salesData": [
      {
        "producto_id": 1,
        "cantidad": 10,
        "precio_unitario": 129.99,
        "fecha": "2024-01-15"
      }
    ]
  }'
```

### 3. Hacer predicción directa
```bash
curl -X POST http://localhost:5000/api/predict \
  -H "Content-Type: application/json" \
  -d '{
    "productId": 1,
    "salesData": [...],
    "months": 3
  }'
```

## JavaScript/Axios

### Obtener productos
```javascript
import axios from 'axios'

const getProducts = async () => {
  try {
    const response = await axios.get('/api/products', {
      params: { limit: 10, search: 'Nike' }
    })
    console.log(response.data.data)
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Predecir ventas
```javascript
const predictSales = async (productId, months) => {
  try {
    const response = await axios.post('/api/predictions/predict', {
      productId,
      months
    })
    return response.data.data.predictions
  } catch (error) {
    console.error('Error:', error)
    throw error
  }
}

// Uso
const predictions = await predictSales(1, 3)
console.log(predictions)
```

## Python

### Usar el predictor directamente
```python
from models.predictor import SalesPredictor

# Inicializar
predictor = SalesPredictor()

# Entrenar
sales_data = [
    {
        'producto_id': 1,
        'cantidad': 10,
        'precio_unitario': 129.99,
        'fecha': '2024-01-15'
    }
]
metrics = predictor.train(sales_data)
print(f"R² Score: {metrics['r2']}")

# Predecir
predictions = predictor.predict(sales_data, months=3)
for pred in predictions:
    print(f"{pred['month']}: {pred['predicted_quantity']} unidades")
```

## SQL

### Consultas útiles

#### Productos más vendidos por marca
```sql
SELECT 
  p.marca,
  COUNT(*) as total_ventas,
  SUM(v.cantidad) as unidades_vendidas,
  SUM(v.cantidad * v.precio_unitario) as ingresos_totales
FROM ventas v
JOIN productos p ON v.producto_id = p.id
GROUP BY p.marca
ORDER BY ingresos_totales DESC;
```

#### Ventas por mes
```sql
SELECT 
  DATE_FORMAT(fecha, '%Y-%m') as mes,
  COUNT(*) as ordenes,
  SUM(cantidad) as unidades,
  SUM(cantidad * precio_unitario) as ingresos
FROM ventas
WHERE YEAR(fecha) = 2024
GROUP BY mes
ORDER BY mes;
```

#### Top productos del mes actual
```sql
SELECT 
  p.nombre,
  p.marca,
  SUM(v.cantidad) as vendidos
FROM ventas v
JOIN productos p ON v.producto_id = p.id
WHERE MONTH(v.fecha) = MONTH(CURDATE())
  AND YEAR(v.fecha) = YEAR(CURDATE())
GROUP BY p.id, p.nombre, p.marca
ORDER BY vendidos DESC
LIMIT 10;
```
