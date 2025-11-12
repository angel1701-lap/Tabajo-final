# ✅ Checklist de Instalación y Configuración

## Pre-requisitos

- [ ] Node.js 18+ instalado
- [ ] Python 3.11+ instalado
- [ ] MySQL 8+ instalado y corriendo
- [ ] Git instalado
- [ ] (Opcional) Docker y Docker Compose

## Instalación

### 1. Clonar/Descargar Proyecto
- [ ] Proyecto descargado
- [ ] Navegar a la carpeta del proyecto

### 2. Base de Datos
- [ ] MySQL corriendo
- [ ] Crear base de datos: `mysql -u root -p < backend/database/schema.sql`
- [ ] Verificar que las tablas se crearon correctamente
- [ ] Verificar datos de ejemplo

### 3. Backend
- [ ] `cd backend`
- [ ] `npm install`
- [ ] Copiar `.env.example` a `.env`
- [ ] Configurar credenciales de BD en `.env`
- [ ] Probar: `npm run dev`
- [ ] Verificar: http://localhost:3000/api/health

### 4. Frontend
- [ ] `cd frontend`
- [ ] `npm install`
- [ ] Probar: `npm run dev`
- [ ] Verificar: http://localhost:5173

### 5. ML Service
- [ ] `cd ml-service`
- [ ] Crear entorno virtual: `python -m venv venv`
- [ ] Activar entorno:
  - Windows: `venv\Scripts\activate`
  - Linux/Mac: `source venv/bin/activate`
- [ ] `pip install -r requirements.txt`
- [ ] Copiar `.env.example` a `.env`
- [ ] Probar: `python app.py`
- [ ] Verificar: http://localhost:5000/api/health

## Verificación

### Backend
- [ ] Health check responde OK
- [ ] Conexión a BD exitosa
- [ ] Endpoint `/api/products` retorna productos
- [ ] Endpoint `/api/sales/summary` retorna datos

### Frontend
- [ ] Página carga correctamente
- [ ] Dashboard muestra métricas
- [ ] Gráficos se renderizan
- [ ] Navegación funciona

### ML Service
- [ ] Health check responde OK
- [ ] Endpoint `/api/model/info` responde

### Integración
- [ ] Frontend puede llamar al Backend
- [ ] Backend puede llamar al ML Service
- [ ] Predicciones funcionan end-to-end

## Entrenar Modelo

- [ ] Ir a http://localhost:5173/predictions
- [ ] Click en botón "Entrenar"
- [ ] Esperar confirmación
- [ ] Verificar que modelo está entrenado

## Hacer Primera Predicción

- [ ] Seleccionar un producto
- [ ] Elegir 3 meses
- [ ] Click en "Predecir"
- [ ] Ver resultados en gráfico y tabla

## Troubleshooting

### Puerto ocupado
- [ ] Verificar que puertos 3000, 5000, 5173 estén libres
- [ ] Matar procesos si es necesario

### Error de conexión a BD
- [ ] Verificar que MySQL esté corriendo
- [ ] Verificar credenciales en `.env`
- [ ] Verificar que la BD existe

### Error en ML Service
- [ ] Verificar que Python 3.11+ esté instalado
- [ ] Verificar que todas las dependencias estén instaladas
- [ ] Verificar que el entorno virtual esté activado

### Error en Frontend
- [ ] Verificar que Backend esté corriendo
- [ ] Verificar proxy en `vite.config.js`
- [ ] Limpiar cache: `rm -rf node_modules && npm install`

## Alternativa: Docker

Si prefieres usar Docker:

- [ ] Docker instalado
- [ ] Docker Compose instalado
- [ ] Ejecutar: `docker-compose up -d`
- [ ] Esperar que todos los servicios inicien
- [ ] Verificar logs: `docker-compose logs -f`
- [ ] Acceder a http://localhost:5173

## Siguiente Paso

Una vez todo funcione:
- [ ] Leer [EXAMPLES.md](EXAMPLES.md) para ver ejemplos de uso
- [ ] Explorar [API.md](API.md) para conocer todos los endpoints
- [ ] Revisar [COMMANDS.md](COMMANDS.md) para comandos útiles

## Limpieza (Opcional)

Si todo funciona y quieres limpiar las carpetas antiguas:
- [ ] Hacer backup de datos importantes
- [ ] Eliminar carpeta `server/`
- [ ] Eliminar carpeta `client/`
- [ ] Actualizar `.gitignore` si es necesario
