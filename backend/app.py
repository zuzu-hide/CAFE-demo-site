from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import json
import os
from datetime import datetime 

app = Flask(__name__)
CORS(app)

ORDERS_FILE = 'orders.json'

def init_orders_file():
    if not os.path.exists(ORDERS_FILE):
        with open(ORDERS_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f, ensure_ascii=False, indent=2)

init_orders_file()


def save_order(order_data):
    with open(ORDERS_FILE, 'r', encoding='utf-8') as f:
        orders = json.load(f)

    order_data['timestamp'] = datetime.now().isoformat()
    order_data['status'] = '未対応'
    orders.append(order_data)

    with open(ORDERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(orders, f, ensure_ascii=False, indent=2)

    return order_data

def get_all_orders():
    with open(ORDERS_FILE, 'r', encoding='utf-8') as f:
        orders = json.load(f)
    return orders

def update_order_status(order_id, status):
    with open(ORDERS_FILE, 'r', encoding='utf-8') as f:
        orders = json.load(f)
    
    for order in orders:
        if order.get('orderId') == order_id:
            order['status'] = status
            break
    with open(ORDERS_FILE, 'w', encoding='utf-8') as f:
        json.dump(orders, f, ensure_ascii=False, indent=2)

    return True

@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        order_data = request.get_json()

        if not order_data.get('userInfo'):
            return jsonify({'error': 'ユーザー情報がありません'}), 400

        if not order_data.get('orderData'):
            return jsonify({'error': '注文データがありません'}), 400

        saved_order = save_order(order_data)

        print(f"✅ 新規注文を受信: {saved_order.get('orderId')}")
        print(f"    お客様: {order_data['userInfo'].get('username')}")
        print(f"    部屋: {order_data['userInfo'].get('roomNumber')}")
        print(f"    合計: ₱{order_data['orderData'].get('totalPrice')}")

        return jsonify({
            'success': True,
            'message': '注文を受け取りました',
            'order': saved_order
        }), 201
    
    except Exception as e:
        print(f"❌ エラー: {str(e)}")
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/orders', methods=['GET'])
def get_orders():
    try:
        orders = get_all_orders()
        return jsonify({
            'success': True,
            'orders': orders,
            'count': len(orders)
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/api/orders/<order_id>', methods=['PUT'])
def update_order(order_id):
    try:
        data = request.get_json()
        status = data.get('status', '対応中')

        update_order_status(order_id, status)

        return jsonify({
            'success': True,
            'message': 'ステータスを更新しました'
        }), 200
    except Exception as e:
        return jsonify({'error', str(e)}), 500
    
@app.route('/api/test', methods=['GET'])
def test():
    return jsonify({
        'message': 'APIが正常に動作しています',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/')
def home():
    return '''
    <html>
        <head>
            <title>Cafe API</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 { color: #333; }
                .endpoint {
                    background: #f9f9f9;
                    padding: 15px;
                    margin: 10px 0;
                    border-radius: 5px;
                    border-left: 4px solid #667eea;
                }
                code {
                    background: #eee;
                    padding: 2px 8px;
                    border-radius: 3px;
                    font-family: monospace;
                }
                a {
                    color: #667eea;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🍵 Cafe Order API</h1>
                <p>APIが正常に起動しています！</p>
                
                <h2>利用可能なエンドポイント：</h2>
                
                <div class="endpoint">
                    <strong>POST /api/orders</strong><br>
                    新しい注文を受け付けます
                </div>
                
                <div class="endpoint">
                    <strong>GET /api/orders</strong><br>
                    全ての注文を取得します
                </div>
                
                <div class="endpoint">
                    <strong>PUT /api/orders/&lt;order_id&gt;</strong><br>
                    注文のステータスを更新します
                </div>
                
                <div class="endpoint">
                    <strong>GET /api/test</strong><br>
                    APIのテスト
                </div>
                
                <p style="margin-top: 30px;">
                    <a href="/staff.html">📊 スタッフ用管理画面</a>
                </p>
            </div>
        </body>
    </html>
    '''

if __name__ == '__main__':
    print("=" * 50)
    print("🍵 Cafe Order API を起動中...")
    print("=" * 50)
    print("📡 サーバー: http://localhost:5000")
    print("📊 スタッフ画面: http://localhost:5000/staff.html")
    print("🧪 テスト: http://localhost:5000/api/test")
    print("=" * 50)
    print()    

app.run(debug=True, host='0.0.0.0', port=5000)