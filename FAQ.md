# ❓ Preguntas Frecuentes (FAQ)

## Instalación y Configuración

### ¿Qué necesito instalar?
- Node.js 18+
- Python 3.11+
- MySQL 8+
- (Opcional) Docker

### ¿Puedo usar Docker?
Sí, ejecuta `docker-compose up -d` y todos los servicios se iniciarán automáticamente.

### ¿En qué puertos corren los servicios?
- Frontend: 5173
- Backend: 3000
- ML Service: 5000
- MySQL: 3306

### ¿Cómo cambio los puertos?
Edita los archivos `.env` de cada servicio y `docker-compose.yml` si usas Docker.

## Base de Datos

### ¿Cómo creo la base de datos?
```bash
mysql -u root -p < backend/database/schema.sql
```

### ¿Viene con datos de ejemplo?
Sí, el esquema incluye 8 productos y 200+ ventas de ejemplo.

### ¿Puedo usar PostgreSQL en lugar de MySQL?
Sí, pero necesitarás modificar el código del backend y cambiar el driver.

### ¿Cómo hago backup de la BD?
```bash
mysqldump -u root -p zapatillas_db > backup.sql
```

## Backend

### ¿Cómo agrego un nuevo endpoint?
1. Crea una nueva ruta en `backend/src/routes/`
2. Importa y usa en `backend/src/server.js`

### ¿Cómo manejo errores?
Usa `next(error)` o lanza `new AppError(mensaje, statusCode)`

### ¿Puedo agregar autenticación?
Sí, puedes agregar JWT. Ver sección de mejoras futuras en PROJECT_INFO.md

## Frontend

### ¿Cómo agrego una nueva página?
1. Crea componente en `frontend/src/pages/`
2. Agrega ruta en `frontend/src/App.jsx`
3. Agrega link en `frontend/src/components/Layout.jsx`

### ¿Puedo cambiar los colores?
Sí, edita `frontend/tailwind.config.js` para personalizar el tema.

### ¿Cómo agrego un nuevo gráfico?
Usa Recharts. Ver ejemplos en `Dashboard.jsx` y documentación de Recharts.

## ML Service

### ¿Cómo funciona el modelo?
Usa Random Forest Regressor con características temporales y promedios móviles.

### ¿Necesito entrenar el modelo?
Sí, la primera vez debes entrenar el modelo con datos históricos.

### ¿Cuántos datos necesito para entrenar?
Mínimo 30-50 registros de ventas para resultados razonables.

### ¿Puedo usar otro algoritmo?
Sí, modifica `ml-service/models/predictor.py` y cambia el modelo.

### ¿Dónde se guarda el modelo entrenado?
En `ml-service/models/sales_predictor.pkl`

### ¿Cada cuánto debo reentrenar?
Depende de tus datos. Recomendado: mensual o cuando haya cambios significativos.

## Predicciones

### ¿Qué tan precisas son las predicciones?
Depende de la calidad y cantidad de datos históricos. Verifica las métricas (R², MAE, RMSE).

### ¿Puedo predecir más de 12 meses?
Sí, pero la precisión disminuye. Modifica el límite en el código si es necesario.

### ¿Por qué mis predicciones son 0?
- El modelo no está entrenado
- No hay suficientes datos históricos
- El producto no tiene ventas previas

### ¿Cómo mejoro las predicciones?
- Más datos históricos
- Mejores características (features)
- Probar otros algoritmos (LSTM, Prophet)
- Hyperparameter tuning

## Errores Comunes

### Error: "Cannot connect to MySQL"
- Verifica que MySQL esté corriendo
- Verifica credenciales en `.env`
- Verifica que la BD existe

### Error: "Port 3000 already in use"
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Error: "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Error: "Python module not found"
```bash
pip install -r requirements.txt
```

### Error: "CORS policy"
Verifica que el backend tenga CORS habilitado y el proxy en `vite.config.js` esté configurado.

### Error: "Model not trained"
Entrena el modelo primero:
```bash
curl -X POST http://localhost:3000/api/predictions/train
```

## Performance

### ¿Cómo optimizo las consultas SQL?
- Usa índices (ya incluidos en schema.sql)
- Limita resultados con LIMIT
- Usa paginación
- Cache con Redis

### ¿Cómo hago el frontend más rápido?
- Build para producción: `npm run build`
- Usa CDN
- Lazy loading de componentes
- Optimiza imágenes

### ¿Cómo escalo el sistema?
Ver sección de Escalabilidad en PROJECT_INFO.md

## Desarrollo

### ¿Cómo debuggeo el backend?
Usa `console.log()` o configura debugger en VS Code.

### ¿Cómo debuggeo el frontend?
Usa React DevTools y Chrome DevTools.

### ¿Cómo veo los logs?
Los logs aparecen en la consola de cada servicio.

### ¿Puedo usar TypeScript?
Sí, pero necesitarás configurar TypeScript en cada servicio.

## Despliegue

### ¿Cómo despliego en producción?
Ver sección de Despliegue en PROJECT_INFO.md

### ¿Necesito cambiar algo para producción?
- Cambiar `NODE_ENV` a `production`
- Usar variables de entorno seguras
- Configurar HTTPS
- Optimizar build del frontend

### ¿Puedo usar servicios gratuitos?
Sí:
- Frontend: Vercel, Netlify (gratis)
- Backend: Heroku, Railway (tier gratis limitado)
- BD: PlanetScale, Supabase (tier gratis)

## Otros

### ¿Puedo usar esto comercialmente?
Sí, licencia MIT permite uso comercial.

### ¿Cómo contribuyo al proyecto?
Ver sección de Contribución en PROJECT_INFO.md

### ¿Dónde reporto bugs?
Crea un issue en el repositorio de GitHub.

### ¿Hay soporte?
Este es un proyecto de código abierto. Consulta la documentación o crea un issue.

### ¿Puedo modificar el código?
Sí, es código abierto bajo licencia MIT.

### ¿Funciona en Windows/Mac/Linux?
Sí, es multiplataforma. Usa `start.bat` en Windows o `start.sh` en Linux/Mac.

### ¿Necesito conocimientos de ML?
No para usar el sistema. Sí para modificar el modelo.

### ¿Puedo agregar más productos?
Sí, inserta directamente en la BD o crea un endpoint POST para productos.

### ¿Cómo agrego más datos de ventas?
Inserta en la tabla `ventas` o crea un endpoint POST para ventas.
