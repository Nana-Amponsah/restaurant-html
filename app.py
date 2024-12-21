from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
import os



app = Flask(__name__, static_folder=os.path.abspath('restaurant/build'), static_url_path='/')

client = MongoClient('mongodb+srv://King:FHYKEIKj7vXYGuSs@restaurantmanagement-pr.37jy4.mongodb.net/restaurantDB?retryWrites=true&w=majority&appName=RestaurantManagement-Prod')

db = client['Restaurant']

CORS(app, origins=["https://tasty-budz-t3xi.onrender.com"])

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/login', methods=['POST'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
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
        
@app.route('/inventory', methods=['GET'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def get_inventory():
    inventory = list(db['Inventory'].find())
    for item in inventory:
        item['_id'] = str(item['_id'])
    return jsonify(inventory)


@app.route('/employee', methods=['GET'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def get_paysheet():
    paysheet = list(db['Paysheet'].find())
    for item in paysheet:
        item['_id'] = str(item['_id'])
    return jsonify(paysheet)

@app.route('/report', methods=['GET'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def get_report():
    report = list(db['Reports'].find())
    for item in report:
        item['_id'] = str(item['_id'])
    return jsonify(report)

@app.route('/update_inventory', methods=['POST'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def update_inventory():
    if request.method == 'POST':
        data = request.json
        item_name = data.get('item_name')
        qauntity_stock = data.get('quantity_stock')

    inventory = db['Inventory'].find_one({'item_name': item_name})

    if inventory:
        db['Inventory'].update_one({'item_name': item_name}, {'$set': {'quantity_stock': qauntity_stock}})
        return jsonify({'success': True, 'message': 'Item updated successfully'})
    else:
        print(item_name, qauntity_stock)
        return jsonify({'success': False, 'message': 'Item doesnot exist'})

@app.route('/add_report', methods=['POST'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def add_report():
    if request.method == 'POST':
        data = request.json
        item_name = data.get('item_name')
        purchase_date = data.get('purchase_date')
        quantity_purchased = data.get('quantity_purchased')
        total_price = data.get('total_price')
    
    db['Reports'].insert_one({'item_name':item_name, 'purchase_date':purchase_date, 'quantity_purchased': quantity_purchased, 'total_price':total_price})
    return jsonify({'success': True, 'message': 'Report added successfully'})

@app.route('/employees', methods=['GET'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def get_employees():
    employees = list(db['Employees'].find())
    for employee in employees:
        employee['_id'] = str(employee['_id'])
    return jsonify(employees)

@app.route('/add_paysheet', methods=['POST'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def add_paysheet():
    if request.method == 'POST':
        data = request.json
        amount_paid = data.get('amount_paid')
        name = data.get('name')
        payment_date = data.get('payment_date')
        payment_type = data.get('payment_type')
        
    
    db['Paysheet'].insert_one({'amount_paid':amount_paid, 'name':name, 'payment_date':payment_date, 'payment_type':payment_type})
    return jsonify({'success': True, 'message': 'Payment entry added successfully'})

@app.route('/add_employee', methods=['POST'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def add_employee():
    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        contact = data.get('contact')
        
        employee = db['Employees'].find_one({'name':name})
        
        if employee:
            return jsonify({'success': False, 'message': 'User already exists'})
        else:
            db['Employees'].insert_one({'name':name, 'contact':contact})
            return jsonify({'success': True, 'message': 'Employee added successfully'})
        
@app.route('/remove_employee', methods=['POST'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def remove_employee():
    if request.method == 'POST':
        data = request.json
        name = data.get('name')
        
        employee = db['Employees'].find_one({'name':name})
        
        if employee:
            db['Employees'].delete_one({'name':name})
            return jsonify({'success': True, 'message': 'Employee removed successfully'})
        else:
            return jsonify({'success': False, 'message': 'Employee does not exist'})
        
@app.route('/add_item', methods=['POST'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def add_item():
    if request.method == 'POST':
        data = request.json
        item_name = data.get('item_name')
        quantity_stock = data.get('quantity_stock')
        
        inventory_item = db['Inventory'].find_one({'item_name':item_name})
        
        if inventory_item:
            return jsonify({'success': False, 'message': 'Item already exists'})
        else:
            db['Inventory'].insert_one({'item_name':item_name, 'quantity_stock':quantity_stock})
            return jsonify({'success': True, 'message': 'Item added successfully'})
        
@app.route('/remove_item', methods=['POST'])
@cross_origin(origins=["https://tasty-budz-t3xi.onrender.com"])
def remove_item():
    if request.method == 'POST':
        data = request.json
        item_name = data.get('item_name')
        
        inventory_item = db['Inventory'].find_one({'item_name':item_name})
        
        if inventory_item:
            db['Inventory'].delete_one({'item_name':item_name})
            return jsonify({'success': True, 'message': 'Item removed successfully'})
        else:
            return jsonify({'success': False, 'message': 'Item does not exist'})

if __name__ == '__main__':
    app.debug = True
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
