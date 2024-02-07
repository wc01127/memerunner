import os
import json
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
import boto3
from botocore.exceptions import NoCredentialsError, ClientError

app = Flask(__name__)
CORS(app)

# AWS S3 Configuration
BUCKET_NAME = 'memerunner'  # Your S3 Bucket name

def load_data_s3(file_name):
    s3 = boto3.client('s3', region_name='us-east-2')  # Adjust the region accordingly
    try:
        obj = s3.get_object(Bucket=BUCKET_NAME, Key=file_name)
        print('here')
        data = json.loads(obj['Body'].read())
        print('here2')
        return data
    except NoCredentialsError:
        print("Credentials not available")
        return jsonify({"error": "Credentials not available"}), 500
    except ClientError as e:
        if e.response['Error']['Code'] == "NoSuchKey":
            print("The file does not exist.")
            return jsonify({"error": "The file does not exist."}), 404
        else:
            print(f"Unexpected error: {e}")
            return jsonify({"error": "An unexpected error occurred"}), 500

@app.route('/api/enriched_coingecko_data', methods=['GET'])
def get_enriched_coingecko_data():
    file_name = 'enriched_data.json'
    loaded_data = load_data_s3(file_name)
    if loaded_data:
        return jsonify(loaded_data)
    else:
        return jsonify({"error": "No enriched data available"}), 404

@app.route('/api/graveyard_coingecko_data', methods=['GET'])
def get_graveyard_coingecko_data():
    file_name = 'graveyard_data.json'
    loaded_data = load_data_s3(file_name)
    if loaded_data:
        return jsonify(loaded_data)
    else:
        return jsonify({"error": "No graveyard data available"}), 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=True)
