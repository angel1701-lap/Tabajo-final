# Información del Proyecto

## 📋 Resumen

Sistema completo de análisis y predicción de ventas de zapatillas con arquitectura de microservicios, Machine Learning y visualizaciones interactivas.

## 🎯 Objetivos

1. **Análisis de Ventas**: Dashboard con métricas clave y visualizaciones
2. **Predicción ML**: Predecir ventas futuras usando Random Forest
3. **Gestión de Datos**: CRUD de productos y ventas
4. **Arquitectura Escalable**: Microservicios independientes

## 🏆 Características Principales

### Dashboard
- Métricas en tiempo real (órdenes, unidades, ingresos)
- Top 5 productos más vendidos
- Gráfico de ventas mensuales
- Visualizaciones interactivas con Recharts

### Productos
- Lista completa de productos
- Búsqueda en tiempo real
- Filtros por marca
- Información detallada

### Predicciones
- Selección de producto
- Predicción de 1-12 meses
- Visualización de resultados
- Entrenamiento del modelo
- Métricas del modelo (MAE, RMSE, R²)

## 🔧 Tecnologías Utilizadas

### Backend (Node.js)
- **Express**: Framework web
- **MySQL2**: Cliente de base de datos
- **Axios**: Cliente HTTP para ML Service
- **CORS**: Manejo de CORS
- **dotenv**: Variables de entorno

### Frontend (React)
- **Vite**: Build tool y dev server
- **React Router**: Navegación
- **TailwindCSS**: Estilos
- **Recharts**: Gráficos
- **Axios**: Cliente HTTP

### ML Service (Python)
- **Flask**: Framework web
- **scikit-learn**: Machine Learning
- **pandas**: Manipulación de datos
- **numpy**: Operaciones numéricas
- **joblib**: Serialización de modelos

### Base de Datos
- **MySQL 8**: Base de datos relacional
- Tablas: `productos`, `ventas`
- Índices optimizados

## 📊 Modelo de Machine Learning

### Algoritmo
**Random Forest Regressor** con 100 árboles

### Características (Features)
1. **Temporales**:
   - Año, mes, día
   - Día de la semana
   - Trimestre

2. **Ventas**:
   - Precio unitario
   - Promedio móvil 7 días
   - Promedio móvil 30 días
   - Total de venta promedio 7 días

### Métricas de Evaluación
- **MAE** (Mean Absolute Error): Error promedio absoluto
- **RMSE** (Root Mean Squared Error): Raíz del error cuadrático medio
- **R²** (R-squared): Coeficiente de determinación

### Proceso de Predicción
1. Obtener datos históricos del producto
2. Preparar características temporales
3. Calcular promedios móviles
4. Escalar características
5. Predecir con Random Forest
6. Retornar predicciones por mes

## 🗄️ Esquema de Base de Datos

### Tabla: productos
```sql
- id (INT, PK, AUTO_INCREMENT)
- nombre (VARCHAR)
- marca (VARCHAR)
- precio (DECIMAL)
- stock (INT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Tabla: ventas
```sql
- id (INT, PK, AUTO_INCREMENT)
- producto_id (INT, FK)
- cantidad (INT)
- precio_unitario (DECIMAL)
- fecha (DATE)
- created_at (TIMESTAMP)
```

## 🔄 Flujo de Datos

### Consulta de Dashboard
```
Frontend → Backend → MySQL → Backend → Frontend
```

### Predicción de Ventas
```
Frontend → Backend → MySQL (obtener datos)
         ↓
Backend → ML Service (predecir)
         ↓
ML Service → Backend → Frontend
```

### Entrenamiento de Modelo
```
Frontend → Backend → MySQL (obtener todos los datos)
         ↓
Backend → ML Service (entrenar)
         ↓
ML Service (guardar modelo) → Backend → Frontend
```

## 📈 Casos de Uso

### 1. Análisis de Ventas Históricas
- Ver resumen de ventas totales
- Identificar productos más vendidos
- Analizar tendencias mensuales
- Comparar ventas por marca

### 2. Predicción de Demanda
- Predecir ventas de un producto específico
- Planificar inventario
- Estimar ingresos futuros
- Tomar decisiones de compra

### 3. Gestión de Productos
- Buscar productos
- Ver detalles de productos
- Filtrar por marca
- Consultar stock

## 🚀 Escalabilidad

### Horizontal
- Cada servicio puede escalarse independientemente
- Load balancer para distribuir tráfico
- Múltiples instancias de cada servicio

### Vertical
- Optimización de consultas SQL
- Cache con Redis
- CDN para frontend
- GPU para ML (si es necesario)

## 🔒 Seguridad

### Implementado
- Variables de entorno para credenciales
- CORS configurado
- Validación de entrada
- Manejo de errores

### Por Implementar (Producción)
- Autenticación JWT
- Rate limiting
- HTTPS
- Sanitización de inputs
- Logs de auditoría

## 📦 Despliegue

### Desarrollo
- Servicios locales en puertos diferentes
- Hot reload en todos los servicios
- Logs en consola

### Producción (Sugerido)
- **Frontend**: Vercel, Netlify, AWS S3 + CloudFront
- **Backend**: AWS EC2, Heroku, DigitalOcean
- **ML Service**: AWS EC2, Google Cloud Run
- **Base de Datos**: AWS RDS, Google Cloud SQL
- **Docker**: AWS ECS, Google Cloud Run, Kubernetes

## 📝 Mejoras Futuras

### Funcionalidades
- [ ] Autenticación de usuarios
- [ ] Roles y permisos
- [ ] Exportar reportes (PDF, Excel)
- [ ] Notificaciones en tiempo real
- [ ] Dashboard personalizable
- [ ] Múltiples modelos ML
- [ ] A/B testing de modelos

### Técnicas
- [ ] Tests unitarios y de integración
- [ ] CI/CD pipeline
- [ ] Monitoreo y alertas
- [ ] Cache con Redis
- [ ] WebSockets para real-time
- [ ] GraphQL API
- [ ] Microservicios adicionales

### ML
- [ ] Más algoritmos (LSTM, Prophet)
- [ ] Hyperparameter tuning
- [ ] Feature engineering avanzado
- [ ] Ensemble de modelos
- [ ] Explicabilidad (SHAP, LIME)
- [ ] Reentrenamiento automático

## 👥 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

MIT License - Ver archivo LICENSE para más detalles

## 📞 Soporte

Para preguntas o problemas:
- Revisar [CHECKLIST.md](CHECKLIST.md)
- Consultar [EXAMPLES.md](EXAMPLES.md)
- Ver [COMMANDS.md](COMMANDS.md)
