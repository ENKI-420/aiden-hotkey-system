"""
Norton Healthcare Beaker Report Fetching Application

This application provides a secure interface to fetch and process Beaker reports
from Epic's FHIR API. Implements HIPAA compliance measures and secure PHI handling.

Author: Norton Healthcare
Version: 1.0
"""

import openai
from openai import OpenAI
import openai.error  # Ensure this line works
import streamlit as st
import requests
import pandas as pd
from datetime import datetime, timedelta
import logging
import os
from dotenv import load_dotenv
from typing import Optional, Dict, Any
import json
from logging.handlers import RotatingFileHandler
import time
import hashlib

# Load environment variables
load_dotenv()

# Configure logging with PHI masking
class PHIMaskingFormatter(logging.Formatter):
    """Custom formatter to mask PHI in log messages."""
    
    def __init__(self, format_string: str):
        super().__init__(format_string)
        
    def format(self, record: logging.LogRecord) -> str:
        if isinstance(record.msg, str):
            # Mask potential PHI (patient IDs, names, etc.)
            record.msg = self._mask_phi(record.msg)
        return super().format(record)
    
    def _mask_phi(self, message: str) -> str:
        # Add PHI masking patterns here
        # This is a simple example - extend based on your needs
        return message

# Configure logging
log_formatter = PHIMaskingFormatter('%(asctime)s - %(levelname)s - %(message)s')
log_handler = RotatingFileHandler(
    'app.log',
    maxBytes=10485760,  # 10MB
    backupCount=10,
    encoding='utf-8'
)
log_handler.setFormatter(log_formatter)
logger = logging.getLogger(__name__)
logger.addHandler(log_handler)
logger.setLevel(logging.INFO)

# Constants
FHIR_BASE_URL = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4/"
OAUTH_URL = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"
SESSION_TIMEOUT = 30  # minutes

def init_session_state():
    """Initialize session state variables."""
    if 'login_time' not in st.session_state:
        st.session_state.login_time = None
    if 'auth_token' not in st.session_state:
        st.session_state.auth_token = None

def check_session_timeout() -> bool:
    """Check if the current session has timed out."""
    if st.session_state.login_time:
        elapsed_time = datetime.now() - st.session_state.login_time
        if elapsed_time > timedelta(minutes=SESSION_TIMEOUT):
            st.session_state.auth_token = None
            st.session_state.login_time = None
            return True
    return False

def authenticate_user(username: str, password: str) -> Optional[str]:
    """
    Authenticate user with Epic OAuth2.
    
    Args:
        username: Epic username
        password: Epic password
        
    Returns:
        Optional[str]: Access token if successful, None otherwise
    """
    try:
        auth_data = {
            'grant_type': 'password',
            'username': username,
            'password': password,
            'client_id': os.getenv('EPIC_CLIENT_ID'),
            'client_secret': os.getenv('EPIC_CLIENT_SECRET')
        }
        
        response = requests.post(OAUTH_URL, data=auth_data)
        response.raise_for_status()
        
        logger.info(f"Successful authentication for user: {username}")
        return response.json().get('access_token')
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Authentication error: {str(e)}")
        return None

def fetch_beaker_report(patient_id: str, auth_token: str) -> Optional[Dict[str, Any]]:
    """
    Fetch Beaker Report using OAuth token.
    
    Args:
        patient_id: Epic patient ID
        auth_token: Valid OAuth token
        
    Returns:
        Optional[Dict[str, Any]]: Report data if successful, None otherwise
    """
    try:
        headers = {
            "Authorization": f"Bearer {auth_token}",
            "Accept": "application/fhir+json"
        }
        
        report_url = f"{FHIR_BASE_URL}DiagnosticReport?patient={patient_id}"
        response = requests.get(report_url, headers=headers)
        response.raise_for_status()
        
        logger.info(f"Successfully fetched report for patient ID: {hashlib.sha256(patient_id.encode()).hexdigest()}")
        return response.json()
        
    except requests.exceptions.RequestException as e:
        logger.error(f"Error fetching report: {str(e)}")
        return None

def process_and_save_to_csv(data: Dict[str, Any], filename: str = "beaker_report_data.csv"):
    """
    Process and save Beaker data to CSV.
    
    Args:
        data: Report data from FHIR API
        filename: Output CSV filename
    """
    try:
        records = data.get("entry", [])
        processed_data = []
        
        for record in records:
            report = record.get("resource", {})
            processed_data.append({
                "Report ID": report.get("id", ""),
                "Test Name": report.get("code", {}).get("text", ""),
                "Date of Test": report.get("issued", ""),
                "Result": report.get("result", ""),
                "Status": report.get("status", "")
            })
        
        df = pd.DataFrame(processed_data)
        df.to_csv(filename, index=False)
        
        logger.info(f"Successfully saved data to {filename}")
        st.success(f"Data saved to {filename}")
        
    except Exception as e:
        logger.error(f"Error processing data: {str(e)}")
        st.error("Error processing data")

def fetch_and_save_patient_data(patient_id: str):
    """
    Fetch and save patient data after authentication.
    
    Args:
        patient_id: Epic patient ID
    """
    if check_session_timeout():
        st.error("Session has expired. Please log in again.")
        return
        
    if 'auth_token' not in st.session_state:
        st.error("User is not authenticated. Please log in first.")
        return
    
    auth_token = st.session_state.auth_token
    data = fetch_beaker_report(patient_id, auth_token)
    
    if data:
        process_and_save_to_csv(data)
    else:
        st.error("Failed to fetch Beaker report data.")

def user_login():
    """Handle user login process."""
    st.subheader("Login to Epic")
    
    username = st.text_input("Epic Username")
    password = st.text_input("Epic Password", type="password")
    
    if st.button("Login"):
        if not username or not password:
            st.error("Please enter both username and password")
            return
            
        token = authenticate_user(username, password)
        if token:
            st.session_state.auth_token = token
            st.session_state.login_time = datetime.now()
            st.success("Login successful! You can now fetch Beaker data.")
        else:
            st.error("Authentication failed. Please check your credentials.")

def main():
    """Main application function."""
    st.title("Norton Healthcare - Beaker Report Fetching")
    
    init_session_state()
    
    if 'auth_token' in st.session_state and st.session_state.auth_token:
        if check_session_timeout():
            st.warning("Your session has expired. Please log in again.")
            user_login()
        else:
            patient_id = st.text_input("Enter Patient ID")
            if st.button('Fetch Beaker Report'):
                if not patient_id:
                    st.error("Please enter a patient ID")
                else:
                    fetch_and_save_patient_data(patient_id)
    else:
        user_login()

    # Adding Epic footer logo
    st.markdown("""
    <div style="position: fixed; bottom: 0; width: 100%; text-align: center; padding: 10px;">
        <img src="https://vendorservices.epic.com/Scripts/React/media/footerLogo.a31a1d6cb66b67c7be72.png" 
            alt="Epic Footer Logo" style="width: 150px;"/>
    </div>
    """, unsafe_allow_html=True)

    # Adding Epic UserWeb logo
    st.markdown("""
    <div style="text-align: center; margin-top: 20px;">
        <img src="https://vendorservices.epic.com/Content/images/UserWeb.png" 
            alt="Epic UserWeb Logo" style="width: 200px;"/>
    </div>
    """, unsafe_allow_html=True)

if __name__ == '__main__':
    main()

