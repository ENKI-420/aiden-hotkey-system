from flask import Flask, request, jsonify
import requests
import pandas as pd

app = Flask(__name__)

FHIR_BASE_URL = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/"
OAUTH_URL = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"

# Authenticate user with Epic OAuth2
def authenticate_user(username, password):
    auth_data = {
        'grant_type': 'password',
        'username': username,
        'password': password,
        'client_id': 'your-client-id',  # Replace with actual client ID
        'client_secret': 'your-client-secret'  # Replace with actual client secret
    }
    response = requests.post(OAUTH_URL, data=auth_data)
    if response.status_code == 200:
        return response.json().get('access_token')
    return None

# Fetch Beaker report
def fetch_beaker_report(patient_id, auth_token):
    headers = {
        "Authorization": f"Bearer {auth_token}",
        "Accept": "application/fhir+json"
    }
    report_url = f"{FHIR_BASE_URL}DiagnosticReport?patient={patient_id}"
    response = requests.get(report_url, headers=headers)
    if response.status_code == 200:
        return response.json()
    return None

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    token = authenticate_user(data['username'], data['password'])
    if token:
        return jsonify({'token': token})
    return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/fetch_report', methods=['GET'])
def fetch_report():
    patient_id = request.args.get('patient_id')
    auth_token = request.headers.get('Authorization')
    
    if not auth_token:
        return jsonify({'error': 'Missing auth token'}), 401

    data = fetch_beaker_report(patient_id, auth_token)
    if data:
        return jsonify(data)
    return jsonify({'error': 'Failed to fetch report'}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)
