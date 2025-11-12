# ⚡ Inicio Rápido (5 minutos)

## 🎯 Objetivo
Tener el sistema funcionando en menos de 5 minutos.

## 📋 Pre-requisitos
- ✅ Node.js 18+ instalado
- ✅ Python 3.11+ instalado
- ✅ MySQL 8+ corriendo

## 🚀 Pasos

### 1️⃣ Base de Datos (1 min)
```bash
mysql -u root -p < backend/database/schema.sql
```

### 2️⃣ Backend (1 min)
```bash
cd backend
npm install
npm run dev
```
✅ Verifica: http://localhost:3000/api/health

### 3️⃣ Frontend (1 min)
**Nueva terminal:**
```bash
cd frontend
npm install
npm run dev
```
✅ Verifica: http://localhost:5173

### 4️⃣ ML Service (2 min)
**Nueva terminal:**
```bash
cd ml-service
python -m venv venv

# Windows:
venv\Scripts\activate

# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
python app.py
```
✅ Verifica: http://localhost:5000/api/health

## 🎉 ¡Listo!

Abre tu navegador en: **http://localhost:5173**

### Primera vez:
1. Ve a **Predicciones**
2. Click en **"Entrenar"**
3. Espera 30 segundos
4. Selecciona un producto
5. Click en **"Predecir"**

## 🐳 Alternativa: Docker (1 comando)

```bash
docker-compose up -d
```

Espera 2 minutos y abre: **http://localhost:5173**

## ❌ Problemas?

### Puerto ocupado
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### MySQL no conecta
- Verifica que MySQL esté corriendo
- Edita `backend/.env` con tus credenciales

### Más ayuda
- [FAQ](FAQ.md)
- [Checklist completo](CHECKLIST.md)

## 📚 Siguiente paso

Lee [EXAMPLES.md](EXAMPLES.md) para ver ejemplos de uso.
