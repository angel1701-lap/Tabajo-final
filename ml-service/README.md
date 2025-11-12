# ML Service - Servicio de Machine Learning

Servicio de predicción de ventas con Python, Flask y scikit-learn.

## Instalación

```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

## Desarrollo

```bash
python app.py
```

El servicio estará disponible en `http://localhost:5000`

## Modelo

El modelo utiliza Random Forest Regressor con las siguientes características:
- Características temporales (año, mes, día, día de la semana, trimestre)
- Precio unitario
- Promedios móviles de ventas (7 y 30 días)

## Endpoints

- `POST /api/predict` - Predecir ventas futuras
- `POST /api/train` - Entrenar el modelo
- `GET /api/model/info` - Información del modelo
