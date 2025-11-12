# 🚀 Sistema de Predicción de Ventas de Zapatillas

Sistema completo con arquitectura de microservicios para análisis y predicción de ventas usando Machine Learning.

> 👋 **Primera vez aquí?** Lee [WELCOME.md](WELCOME.md) para empezar

## ✨ Características

- 📊 **Dashboard interactivo** con métricas en tiempo real
- 🔮 **Predicciones ML** usando Random Forest
- 📈 **Visualizaciones** con gráficos interactivos
- 🏪 **Gestión de productos** y ventas
- 🎯 **API REST** completa y documentada
- 🐳 **Docker** para despliegue fácil

## 🏗️ Arquitectura

```
┌─────────────┐
│   Frontend  │ React + Vite + TailwindCSS
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Backend   │ Node.js + Express + MySQL
└──┬────────┬─┘
   │        │
   ▼        ▼
┌────┐  ┌────────┐
│ DB │  │   ML   │ Python + Flask + scikit-learn
└────┘  └────────┘
```

## 🚀 Inicio Rápido

### ⚡ Opción 1: Docker (Más Rápido)
```bash
docker-compose up -d
```
Espera 2 minutos → Abre http://localhost:5173

### 🔧 Opción 2: Manual (5 minutos)

**Ver [QUICKSTART.md](QUICKSTART.md) para guía detallada**

```bash
# 1. Base de datos
mysql -u root -p < backend/database/schema.sql

# 2. Backend (Terminal 1)
cd backend && npm install && npm run dev

# 3. Frontend (Terminal 2)
cd frontend && npm install && npm run dev

# 4. ML Service (Terminal 3)
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### 🎯 Scripts Automatizados

**Windows:** `start.bat`  
**Linux/Mac:** `./start.sh`

## 🌐 URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **ML Service**: http://localhost:5000

## 📦 Tecnologías

### Backend
- Node.js 18+
- Express 4
- MySQL 8
- Axios

### Frontend
- React 18
- Vite 5
- TailwindCSS 3
- Recharts 2
- React Router 6

### ML Service
- Python 3.11
- Flask 3
- scikit-learn
- pandas, numpy
- Random Forest Regressor

## 📚 Documentación

> 📑 **Ver [INDEX.md](INDEX.md) para índice completo organizado por objetivo, categoría y nivel**

### 🚀 Inicio
- ⚡ [**Inicio Rápido (5 min)**](QUICKSTART.md) - Empezar en 5 minutos
- ✅ [Checklist Completo](CHECKLIST.md) - Guía paso a paso detallada

### 📖 Información
- 📋 [Resumen del Proyecto](SUMMARY.md) - Todo lo que se ha creado
- 📖 [Información Completa](PROJECT_INFO.md) - Detalles del sistema
- 🏗️ [Estructura](STRUCTURE.md) - Organización de archivos
- 🎨 [Arquitectura](ARCHITECTURE.md) - Diagramas y flujos

### 💻 Desarrollo
- 🔌 [API Documentation](API.md) - Endpoints y respuestas
- 💡 [Ejemplos de Uso](EXAMPLES.md) - Código de ejemplo
- ⚡ [Comandos Útiles](COMMANDS.md) - Scripts y comandos

### 🆘 Ayuda
- ❓ [FAQ](FAQ.md) - Preguntas frecuentes
- 🔄 [Guía de Migración](MIGRATION.md) - Migrar desde versión anterior

## 🗄️ Base de Datos

Importar el esquema:
```bash
mysql -u root -p < backend/database/schema.sql
```

El esquema incluye:
- Tabla `productos` con datos de ejemplo
- Tabla `ventas` con 200+ registros de prueba
- Índices optimizados para consultas

## 🤖 Machine Learning

El modelo utiliza **Random Forest Regressor** con:
- Características temporales (año, mes, día, trimestre)
- Promedios móviles (7 y 30 días)
- Precio unitario
- Métricas: MAE, RMSE, R²

### Entrenar el modelo
```bash
curl -X POST http://localhost:3000/api/predictions/train
```

### Hacer predicción
```bash
curl -X POST http://localhost:3000/api/predictions/predict \
  -H "Content-Type: application/json" \
  -d '{"productId": 1, "months": 3}'
```

## 📊 Endpoints Principales

### Backend (Puerto 3000)
- `GET /api/health` - Health check
- `GET /api/products` - Listar productos
- `GET /api/sales/summary` - Resumen de ventas
- `GET /api/sales/top-products` - Top productos
- `GET /api/sales/monthly` - Ventas mensuales
- `POST /api/predictions/predict` - Predecir ventas
- `POST /api/predictions/train` - Entrenar modelo

### ML Service (Puerto 5000)
- `GET /api/health` - Health check
- `POST /api/predict` - Predicción
- `POST /api/train` - Entrenar
- `GET /api/model/info` - Info del modelo

## 🛠️ Desarrollo

Ver [COMMANDS.md](COMMANDS.md) para comandos útiles de desarrollo.

## 📝 Licencia

MIT
