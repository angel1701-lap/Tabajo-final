# 🏗️ Arquitectura del Sistema

## 📊 Diagrama General

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIO                              │
│                      (Navegador Web)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTP
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      FRONTEND                                │
│                   React + Vite                               │
│                   Puerto: 5173                               │
│                                                              │
│  ┌──────────┐  ┌──────────┐  ┌──────────────┐             │
│  │Dashboard │  │ Products │  │ Predictions  │             │
│  └──────────┘  └──────────┘  └──────────────┘             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      BACKEND                                 │
│                  Express + Node.js                           │
│                   Puerto: 3000                               │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                    Routes                             │  │
│  │  • /api/health                                        │  │
│  │  • /api/products                                      │  │
│  │  • /api/sales                                         │  │
│  │  • /api/predictions                                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │                  Middlewares                          │  │
│  │  • CORS                                               │  │
│  │  • JSON Parser                                        │  │
│  │  • Error Handler                                      │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────┬─────────────────────────┬────────────────────┘
               │                         │
               │                         │
               ▼                         ▼
┌──────────────────────────┐  ┌──────────────────────────────┐
│       DATABASE           │  │       ML SERVICE             │
│       MySQL 8            │  │    Python + Flask            │
│     Puerto: 3306         │  │     Puerto: 5000             │
│                          │  │                              │
│  ┌────────────────────┐ │  │  ┌────────────────────────┐ │
│  │   productos        │ │  │  │  Random Forest         │ │
│  │   - id             │ │  │  │  Regressor             │ │
│  │   - nombre         │ │  │  │                        │ │
│  │   - marca          │ │  │  │  Features:             │ │
│  │   - precio         │ │  │  │  • Temporales          │ │
│  │   - stock          │ │  │  │  • Promedios móviles   │ │
│  └────────────────────┘ │  │  │  • Precio              │ │
│                          │  │  └────────────────────────┘ │
│  ┌────────────────────┐ │  │                              │
│  │   ventas           │ │  │  ┌────────────────────────┐ │
│  │   - id             │ │  │  │  Endpoints:            │ │
│  │   - producto_id    │ │  │  │  • POST /api/predict   │ │
│  │   - cantidad       │ │  │  │  • POST /api/train     │ │
│  │   - precio_unit    │ │  │  │  • GET /api/model/info │ │
│  │   - fecha          │ │  │  └────────────────────────┘ │
│  └────────────────────┘ │  │                              │
└──────────────────────────┘  └──────────────────────────────┘
```

## 🔄 Flujos de Datos

### 1. Consulta de Dashboard

```
Usuario → Frontend → Backend → MySQL → Backend → Frontend → Usuario
  (1)       (2)       (3)       (4)      (5)       (6)       (7)

1. Usuario abre dashboard
2. Frontend hace GET /api/sales/summary
3. Backend consulta MySQL
4. MySQL retorna datos agregados
5. Backend formatea respuesta
6. Frontend recibe JSON
7. Usuario ve métricas y gráficos
```

### 2. Predicción de Ventas

```
Usuario → Frontend → Backend → MySQL (datos históricos)
  (1)       (2)       (3)       (4)
                                 ↓
                      Backend → ML Service (predicción)
                        (5)       (6)
                                 ↓
                      ML Service → Backend → Frontend → Usuario
                        (7)       (8)       (9)       (10)

1. Usuario selecciona producto y meses
2. Frontend hace POST /api/predictions/predict
3. Backend recibe solicitud
4. Backend consulta datos históricos en MySQL
5. Backend envía datos a ML Service
6. ML Service prepara features
7. ML Service predice con Random Forest
8. Backend recibe predicciones
9. Frontend recibe JSON con predicciones
10. Usuario ve gráfico y tabla de predicciones
```

### 3. Entrenamiento de Modelo

```
Usuario → Frontend → Backend → MySQL (todos los datos)
  (1)       (2)       (3)       (4)
                                 ↓
                      Backend → ML Service (entrenar)
                        (5)       (6)
                                 ↓
                      ML Service (guardar modelo) → Backend → Frontend
                        (7)                          (8)       (9)
                                                               ↓
                                                            Usuario
                                                              (10)

1. Usuario click en "Entrenar"
2. Frontend hace POST /api/predictions/train
3. Backend recibe solicitud
4. Backend consulta TODAS las ventas en MySQL
5. Backend envía datos a ML Service
6. ML Service entrena Random Forest
7. ML Service guarda modelo en disco
8. Backend recibe métricas (MAE, RMSE, R²)
9. Frontend recibe confirmación
10. Usuario ve mensaje de éxito
```

## 🔐 Capas de la Arquitectura

### Capa de Presentación (Frontend)
```
┌─────────────────────────────────────┐
│         React Components            │
│  • Layout (navegación)              │
│  • Dashboard (métricas)             │
│  • Products (lista)                 │
│  • Predictions (ML)                 │
└─────────────────────────────────────┘
         ↓ Axios HTTP Client
┌─────────────────────────────────────┐
│         API Client Layer            │
│  • GET /api/products                │
│  • GET /api/sales/*                 │
│  • POST /api/predictions/*          │
└─────────────────────────────────────┘
```

### Capa de Aplicación (Backend)
```
┌─────────────────────────────────────┐
│         Express Routes              │
│  • health.routes.js                 │
│  • product.routes.js                │
│  • sales.routes.js                  │
│  • prediction.routes.js             │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         Business Logic              │
│  • Validación                       │
│  • Transformación                   │
│  • Agregación                       │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         Data Access Layer           │
│  • MySQL Pool                       │
│  • Queries SQL                      │
└─────────────────────────────────────┘
```

### Capa de Datos
```
┌─────────────────────────────────────┐
│         MySQL Database              │
│  • productos (tabla)                │
│  • ventas (tabla)                   │
│  • Índices                          │
└─────────────────────────────────────┘
```

### Capa de ML
```
┌─────────────────────────────────────┐
│         Flask API                   │
│  • /api/predict                     │
│  • /api/train                       │
│  • /api/model/info                  │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         ML Pipeline                 │
│  • Feature Engineering              │
│  • Scaling                          │
│  • Random Forest                    │
└─────────────────────────────────────┘
         ↓
┌─────────────────────────────────────┐
│         Model Storage               │
│  • sales_predictor.pkl              │
└─────────────────────────────────────┘
```

## 🔌 Comunicación entre Servicios

### Frontend ↔ Backend
- **Protocolo**: HTTP/REST
- **Formato**: JSON
- **Puerto**: 3000
- **Proxy**: Vite proxy en desarrollo

### Backend ↔ MySQL
- **Protocolo**: MySQL Protocol
- **Driver**: mysql2
- **Pool**: 10 conexiones
- **Puerto**: 3306

### Backend ↔ ML Service
- **Protocolo**: HTTP/REST
- **Cliente**: Axios
- **Formato**: JSON
- **Puerto**: 5000

## 📦 Despliegue

### Desarrollo Local
```
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Frontend │  │ Backend  │  │    ML    │  │  MySQL   │
│localhost │  │localhost │  │localhost │  │localhost │
│  :5173   │  │  :3000   │  │  :5000   │  │  :3306   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

### Docker Compose
```
┌─────────────────────────────────────────────────────┐
│              Docker Network                         │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐        │
│  │ Frontend │  │ Backend  │  │    ML    │        │
│  │Container │  │Container │  │Container │        │
│  └──────────┘  └──────────┘  └──────────┘        │
│                      │                             │
│                      ▼                             │
│              ┌──────────┐                         │
│              │  MySQL   │                         │
│              │Container │                         │
│              └──────────┘                         │
└─────────────────────────────────────────────────────┘
```

### Producción (Sugerido)
```
┌──────────────────────────────────────────────────────┐
│                    Internet                          │
└────────────────────┬─────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│              CDN (CloudFront)                       │
│              Frontend estático                      │
└────────────────────┬────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────┐
│         Load Balancer (ALB)                         │
└────────────────────┬────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│  Backend EC2    │    │  ML Service EC2 │
│  (Auto Scaling) │    │  (Auto Scaling) │
└────────┬────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│   RDS MySQL     │
│  (Multi-AZ)     │
└─────────────────┘
```

## 🔒 Seguridad

### Implementado
- ✅ Variables de entorno para credenciales
- ✅ CORS configurado
- ✅ Validación de entrada
- ✅ Manejo de errores

### Por Implementar
- ⏳ Autenticación JWT
- ⏳ Rate limiting
- ⏳ HTTPS/TLS
- ⏳ SQL injection prevention (prepared statements)
- ⏳ XSS protection
- ⏳ CSRF tokens

## 📊 Escalabilidad

### Horizontal
```
┌─────────────────────────────────────────────────────┐
│              Load Balancer                          │
└──────┬──────────┬──────────┬──────────┬────────────┘
       │          │          │          │
       ▼          ▼          ▼          ▼
   Backend    Backend    Backend    Backend
   Instance1  Instance2  Instance3  Instance4
       │          │          │          │
       └──────────┴──────────┴──────────┘
                  │
                  ▼
           MySQL Master
                  │
       ┌──────────┴──────────┐
       ▼                     ▼
   Read Replica 1      Read Replica 2
```

### Vertical
- Aumentar recursos (CPU, RAM)
- Optimizar consultas SQL
- Cache con Redis
- CDN para assets estáticos

## 🎯 Patrones de Diseño

### Backend
- **MVC**: Separación de rutas, lógica y datos
- **Middleware**: Manejo de errores, CORS
- **Repository**: Acceso a datos
- **Singleton**: Pool de conexiones

### Frontend
- **Component-Based**: React components
- **Container/Presentational**: Separación de lógica
- **Hooks**: useState, useEffect
- **Routing**: React Router

### ML
- **Pipeline**: Feature engineering → Scaling → Prediction
- **Singleton**: Modelo cargado una vez
- **Factory**: Creación de features
