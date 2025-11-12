# Guía de Migración

## Migrar desde la estructura antigua

Si tienes código en las carpetas `server/` y `client/`, sigue estos pasos:

### 1. Respaldar datos importantes

```bash
# Respaldar base de datos
mysqldump -u root -p zapatillas_db > backup.sql

# Respaldar archivos .env
cp server/.env backend/.env.backup
```

### 2. Migrar configuración

```bash
# Backend
cp server/.env backend/.env

# Ajustar rutas si es necesario
```

### 3. Migrar datos personalizados

Si tienes datos personalizados en `server/data/`, cópialos a `backend/database/`

### 4. Instalar nuevas dependencias

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# ML Service
cd ../ml-service
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 5. Verificar funcionamiento

```bash
# Iniciar cada servicio en terminales separadas
cd backend && npm run dev
cd frontend && npm run dev
cd ml-service && python app.py
```

### 6. Eliminar carpetas antiguas (opcional)

Una vez verificado que todo funciona:

```bash
rm -rf server/
rm -rf client/
```

## Diferencias principales

### Estructura
- `server/` → `backend/`
- `client/` → `frontend/`
- Nuevo: `ml-service/` (servicio ML separado)

### Backend
- Rutas reorganizadas en `backend/src/routes/`
- Middleware de errores mejorado
- Integración con servicio ML

### Frontend
- React Router para navegación
- TailwindCSS para estilos
- Componentes organizados por páginas

### ML
- Servicio independiente en Python
- Modelo Random Forest para predicciones
- API REST para comunicación
