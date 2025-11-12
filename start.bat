@echo off
echo 🚀 Iniciando Sistema de Predicción de Ventas...

REM Backend
echo 📦 Instalando dependencias del backend...
cd backend
call npm install
copy .env.example .env
cd ..

REM Frontend
echo 🎨 Instalando dependencias del frontend...
cd frontend
call npm install
cd ..

REM ML Service
echo 🤖 Configurando servicio ML...
cd ml-service
python -m venv venv
call venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
cd ..

echo ✅ Instalación completada!
echo.
echo Para iniciar los servicios:
echo   Backend:    cd backend ^&^& npm run dev
echo   Frontend:   cd frontend ^&^& npm run dev
echo   ML Service: cd ml-service ^&^& venv\Scripts\activate ^&^& python app.py
echo.
echo O usar Docker: docker-compose up
pause
