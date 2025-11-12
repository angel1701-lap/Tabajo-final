# Estructura del Proyecto

```
proyecto-final/
│
├── backend/                    # API REST (Node.js + Express)
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js    # Configuración MySQL
│   │   ├── middlewares/
│   │   │   └── errorHandler.js
│   │   ├── routes/
│   │   │   ├── health.routes.js
│   │   │   ├── product.routes.js
│   │   │   ├── sales.routes.js
│   │   │   └── prediction.routes.js
│   │   └── server.js          # Punto de entrada
│   ├── database/
│   │   └── schema.sql         # Esquema de BD
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── frontend/                   # Interfaz (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   └── Layout.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Products.jsx
│   │   │   └── Predictions.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── Dockerfile
│   └── README.md
│
├── ml-service/                 # Servicio ML (Python + Flask)
│   ├── models/
│   │   ├── predictor.py       # Modelo de predicción
│   │   └── .gitkeep
│   ├── app.py                 # API Flask
│   ├── requirements.txt
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   └── README.md
│
├── shared/                     # Código compartido
│   └── types.js
│
├── .gitignore
├── docker-compose.yml         # Orquestación Docker
├── start.sh                   # Script inicio Linux/Mac
├── start.bat                  # Script inicio Windows
├── README.md                  # Documentación principal
├── API.md                     # Documentación API
├── COMMANDS.md                # Comandos útiles
├── MIGRATION.md               # Guía de migración
└── STRUCTURE.md               # Este archivo
```

## Flujo de Datos

```
┌─────────────┐
│   Frontend  │ (React - Puerto 5173)
│   (Vite)    │
└──────┬──────┘
       │ HTTP
       ▼
┌─────────────┐
│   Backend   │ (Express - Puerto 3000)
│   (Node.js) │
└──┬────────┬─┘
   │        │
   │        └──────────┐
   │                   │ HTTP
   ▼                   ▼
┌─────────┐     ┌──────────────┐
│  MySQL  │     │  ML Service  │ (Flask - Puerto 5000)
│   DB    │     │   (Python)   │
└─────────┘     └──────────────┘
```

## Tecnologías

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
- pandas
- numpy

### DevOps
- Docker
- Docker Compose
