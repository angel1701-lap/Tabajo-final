from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from models.predictor import SalesPredictor

load_dotenv()

app = Flask(__name__)
CORS(app)

predictor = SalesPredictor()

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({
        'success': True,
        'status': 'healthy',
        'service': 'ML Service',
        'model_loaded': predictor.is_trained()
    })

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        if not data or 'salesData' not in data:
            return jsonify({
                'success': False,
                'error': 'salesData es requerido'
            }), 400
        
        product_id = data.get('productId')
        sales_data = data.get('salesData')
        months = data.get('months', 3)
        
        predictions = predictor.predict(sales_data, months)
        
        return jsonify({
            'success': True,
            'productId': product_id,
            'months': months,
            'predictions': predictions
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/train', methods=['POST'])
def train():
    try:
        data = request.get_json()
        
        if not data or 'salesData' not in data:
            return jsonify({
                'success': False,
                'error': 'salesData es requerido'
            }), 400
        
        sales_data = data.get('salesData')
        metrics = predictor.train(sales_data)
        
        return jsonify({
            'success': True,
            'message': 'Modelo entrenado exitosamente',
            'metrics': metrics
        })
    
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/model/info', methods=['GET'])
def model_info():
    try:
        info = predictor.get_model_info()
        return jsonify({
            'success': True,
            'data': info
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    debug = os.getenv('FLASK_ENV') == 'development'
    
    print(f'🤖 ML Service running on http://localhost:{port}')
    app.run(host='0.0.0.0', port=port, debug=debug)
