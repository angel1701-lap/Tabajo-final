import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import os
from datetime import datetime, timedelta

class SalesPredictor:
    def __init__(self, model_path='models/sales_predictor.pkl'):
        self.model_path = model_path
        self.model = None
        self.scaler = StandardScaler()
        self.feature_names = []
        self.trained_at = None
        self._load_model()
    
    def _load_model(self):
        """Cargar modelo guardado si existe"""
        if os.path.exists(self.model_path):
            try:
                saved_data = joblib.load(self.model_path)
                self.model = saved_data['model']
                self.scaler = saved_data['scaler']
                self.feature_names = saved_data['feature_names']
                self.trained_at = saved_data['trained_at']
                print(f'✅ Modelo cargado desde {self.model_path}')
            except Exception as e:
                print(f'⚠️ Error cargando modelo: {e}')
    
    def _save_model(self):
        """Guardar modelo entrenado"""
        os.makedirs(os.path.dirname(self.model_path), exist_ok=True)
        joblib.dump({
            'model': self.model,
            'scaler': self.scaler,
            'feature_names': self.feature_names,
            'trained_at': self.trained_at
        }, self.model_path)
        print(f'💾 Modelo guardado en {self.model_path}')
    
    def _prepare_features(self, sales_data):
        """Preparar características para el modelo"""
        df = pd.DataFrame(sales_data)
        df['fecha'] = pd.to_datetime(df['fecha'])
        df = df.sort_values('fecha')
        
        # Características temporales
        df['year'] = df['fecha'].dt.year
        df['month'] = df['fecha'].dt.month
        df['day'] = df['fecha'].dt.day
        df['dayofweek'] = df['fecha'].dt.dayofweek
        df['quarter'] = df['fecha'].dt.quarter
        
        # Características de ventas
        df['total_sale'] = df['cantidad'] * df['precio_unitario']
        
        # Características agregadas (rolling)
        df['cantidad_ma7'] = df['cantidad'].rolling(window=7, min_periods=1).mean()
        df['cantidad_ma30'] = df['cantidad'].rolling(window=30, min_periods=1).mean()
        df['total_sale_ma7'] = df['total_sale'].rolling(window=7, min_periods=1).mean()
        
        return df
    
    def train(self, sales_data):
        """Entrenar el modelo con datos históricos"""
        df = self._prepare_features(sales_data)
        
        # Seleccionar características
        feature_cols = [
            'year', 'month', 'day', 'dayofweek', 'quarter',
            'precio_unitario', 'cantidad_ma7', 'cantidad_ma30', 'total_sale_ma7'
        ]
        
        X = df[feature_cols].fillna(0)
        y = df['cantidad']
        
        # Dividir datos
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )
        
        # Escalar características
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Entrenar modelo
        self.model = RandomForestRegressor(
            n_estimators=100,
            max_depth=10,
            random_state=42,
            n_jobs=-1
        )
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluar
        y_pred = self.model.predict(X_test_scaled)
        
        metrics = {
            'mae': float(mean_absolute_error(y_test, y_pred)),
            'rmse': float(np.sqrt(mean_squared_error(y_test, y_pred))),
            'r2': float(r2_score(y_test, y_pred)),
            'samples': len(df)
        }
        
        self.feature_names = feature_cols
        self.trained_at = datetime.now().isoformat()
        self._save_model()
        
        return metrics
    
    def predict(self, sales_data, months=3):
        """Predecir ventas futuras"""
        if not self.is_trained():
            raise Exception('El modelo no está entrenado')
        
        df = self._prepare_features(sales_data)
        
        # Obtener última fecha y valores
        last_date = df['fecha'].max()
        last_price = df['precio_unitario'].iloc[-1]
        
        predictions = []
        
        for i in range(1, months + 1):
            future_date = last_date + timedelta(days=30 * i)
            
            # Crear características para predicción
            features = {
                'year': future_date.year,
                'month': future_date.month,
                'day': future_date.day,
                'dayofweek': future_date.dayofweek,
                'quarter': (future_date.month - 1) // 3 + 1,
                'precio_unitario': last_price,
                'cantidad_ma7': df['cantidad'].tail(7).mean(),
                'cantidad_ma30': df['cantidad'].tail(30).mean(),
                'total_sale_ma7': df['total_sale'].tail(7).mean()
            }
            
            X_pred = pd.DataFrame([features])[self.feature_names]
            X_pred_scaled = self.scaler.transform(X_pred)
            
            predicted_quantity = self.model.predict(X_pred_scaled)[0]
            predicted_quantity = max(0, predicted_quantity)  # No negativo
            
            predictions.append({
                'month': future_date.strftime('%Y-%m'),
                'predicted_quantity': float(predicted_quantity),
                'predicted_revenue': float(predicted_quantity * last_price)
            })
        
        return predictions
    
    def is_trained(self):
        """Verificar si el modelo está entrenado"""
        return self.model is not None
    
    def get_model_info(self):
        """Obtener información del modelo"""
        if not self.is_trained():
            return {
                'trained': False,
                'message': 'Modelo no entrenado'
            }
        
        return {
            'trained': True,
            'trained_at': self.trained_at,
            'features': self.feature_names,
            'model_type': 'RandomForestRegressor'
        }
