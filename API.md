# Documentación de API

## Backend API (Puerto 3000)

### Health Check
```
GET /api/health
```
Verifica el estado del servidor y la conexión a la base de datos.

### Productos

#### Listar productos
```
GET /api/products?limit=100&offset=0&marca=Nike&search=Air
```

#### Obtener producto por ID
```
GET /api/products/:id
```

#### Obtener marcas
```
GET /api/products/meta/brands
```

### Ventas

#### Listar ventas
```
GET /api/sales?limit=100&offset=0&startDate=2024-01-01&endDate=2024-12-31
```

#### Resumen de ventas
```
GET /api/sales/summary
```

#### Productos más vendidos
```
GET /api/sales/top-products?limit=10
```

#### Ventas mensuales
```
GET /api/sales/monthly?year=2024&months=12
```

#### Ventas por marca
```
GET /api/sales/by-brand
```

### Predicciones

#### Predecir ventas
```
POST /api/predictions/predict
Content-Type: application/json

{
  "productId": 1,
  "months": 3
}
```

#### Entrenar modelo
```
POST /api/predictions/train
```

#### Información del modelo
```
GET /api/predictions/model-info
```

## ML Service API (Puerto 5000)

### Health Check
```
GET /api/health
```

### Predicción
```
POST /api/predict
Content-Type: application/json

{
  "productId": 1,
  "salesData": [...],
  "months": 3
}
```

### Entrenar modelo
```
POST /api/train
Content-Type: application/json

{
  "salesData": [...]
}
```

### Información del modelo
```
GET /api/model/info
```

## Respuestas

Todas las respuestas siguen el formato:

```json
{
  "success": true,
  "data": {...}
}
```

En caso de error:

```json
{
  "success": false,
  "error": "Mensaje de error"
}
```
