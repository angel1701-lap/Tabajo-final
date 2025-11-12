# Comandos Útiles

## Instalación Rápida

### Windows
```bash
start.bat
```

### Linux/Mac
```bash
chmod +x start.sh
./start.sh
```

### Docker
```bash
docker-compose up -d
```

## Desarrollo

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### ML Service
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
python app.py
```

## Base de Datos

### Crear base de datos
```bash
mysql -u root -p < backend/database/schema.sql
```

### Backup
```bash
mysqldump -u root -p zapatillas_db > backup.sql
```

### Restaurar
```bash
mysql -u root -p zapatillas_db < backup.sql
```

## Docker

### Iniciar todos los servicios
```bash
docker-compose up -d
```

### Ver logs
```bash
docker-compose logs -f
```

### Detener servicios
```bash
docker-compose down
```

### Reconstruir
```bash
docker-compose up -d --build
```

## Testing

### Backend
```bash
cd backend
npm test
```

### Frontend
```bash
cd frontend
npm test
```

## Build para Producción

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Troubleshooting

### Puerto ocupado
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Reinstalar dependencias
```bash
rm -rf node_modules package-lock.json
npm install
```

### Limpiar cache de Python
```bash
find . -type d -name __pycache__ -exec rm -r {} +
```
