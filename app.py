from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory



app = Flask(__name__, static_folder='restaurant/build', static_url_path='')
# app = Flask(__name__)

client = MongoClient('mongodb+srv://King:FHYKEIKj7vXYGuSs@restaurantmanagement-pr.37jy4.mongodb.net/restaurantDB?retryWrites=true&w=majority&appName=RestaurantManagement-Prod')

db = client['Restaurant']

CORS(app)

@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        data = request.json
        username = data.get('username')
        password = data.get('password')

        user = db['Login'].find_one({'username': username, 'password': password})

        if user:
            return jsonify({'success': True, 'message':'Login successful'})
        else:
            return jsonify({'success': False, 'message':'Login failed, Check your credentials'})

if __name__ == '__main__':
    app.debug = True
    app.run()