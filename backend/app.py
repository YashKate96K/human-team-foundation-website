from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# In-memory store for requests
requests_db = []

# Helper: find request by id
def find_request(rid):
    for req in requests_db:
        if req['id'] == rid:
            return req
    return None

@app.route('/api/requests', methods=['GET'])
def get_requests():
    return jsonify(requests_db)

@app.route('/api/requests', methods=['POST'])
def add_request():
    data = request.json
    new_id = (requests_db[-1]['id'] + 1) if requests_db else 1
    req = {
        'id': new_id,
        'title': data.get('title', ''),
        'status': data.get('status', 'pending'),
        'volunteer': data.get('volunteer', ''),
        'feedback': data.get('feedback', None)
    }
    requests_db.append(req)
    return jsonify(req), 201

@app.route('/api/requests/<int:rid>', methods=['PATCH'])
def update_request(rid):
    req = find_request(rid)
    if not req:
        return jsonify({'error': 'Not found'}), 404
    data = request.json
    req.update({k: v for k, v in data.items() if k in req})
    return jsonify(req)

if __name__ == '__main__':
    app.run(debug=True)
