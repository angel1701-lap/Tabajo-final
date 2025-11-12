#!/bin/bash

echo "🚀 Iniciando Sistema de Predicción de Ventas..."

# Backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install
cp .env.example .env
cd ..

# Frontend
echo "🎨 Instalando dependencias del frontend..."
cd frontend
npm install
cd ..

# ML Service
echo "🤖 Configurando servicio ML..."
cd ml-service
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
cd ..

echo "✅ Instalación completada!"
echo ""
echo "Para iniciar los servicios:"
echo "  Backend:    cd backend && npm run dev"
echo "  Frontend:   cd frontend && npm run dev"
echo "  ML Service: cd ml-service && source venv/bin/activate && python app.py"
echo ""
echo "O usar Docker: docker-compose up"
