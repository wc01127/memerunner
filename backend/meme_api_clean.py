import requests
import os
import time
import json
import pandas as pd
from datetime import datetime
from ratelimit import limits, sleep_and_retry
from datetime import timedelta
from coinmarketcapapi import CoinMarketCapAPI, CoinMarketCapAPIError
from flask import Flask, jsonify
from flask_cors import CORS

# Constants
COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets'
COINGECKO_COIN_API_URL = 'https://api.coingecko.com/api/v3/coins/'
CHAIN_API_URL = 'https://icons.llamao.fi/icons/chains/rsz_token?w=48&h=48'
STRIP_CHARS = '!?@#$.'
CMC_API_KEY = '02630e73-8ed0-48f7-80ce-a60398599468'  
CG_API_KEY = 'CG-wkaU3WnSmWTxKcCYfhSezwMF'
DATA_FILE_PATH = 'enriched_data.json'
UPDATE_INTERVAL = timedelta(hours=6)  # Interval to refresh data

# Initialize CoinMarketCapAPI
cmc = CoinMarketCapAPI(CMC_API_KEY)

def save_data(data):
    # Convert the dictionary to a DataFrame
    df = pd.DataFrame(data)
    # Replace NaN values with 0
    df.fillna(-1, inplace=True)
    # Convert the DataFrame back to a dictionary
    data_with_no_nan = df.to_dict(orient='records')
    with open(DATA_FILE_PATH, 'w') as file:
        json.dump({'last_updated': datetime.now().isoformat(), 'data': data_with_no_nan}, file)

def load_data():
    if os.path.exists(DATA_FILE_PATH):
        with open(DATA_FILE_PATH, 'r') as file:
            return json.load(file)
    return None

def data_needs_update():
    data = load_data()
    if data and 'last_updated' in data:
        last_updated = datetime.fromisoformat(data['last_updated'])
        return datetime.now() - last_updated > UPDATE_INTERVAL
    return True

# Rate Limit Decorators
@sleep_and_retry
@limits(calls=30, period=timedelta(seconds=61).total_seconds())
def get_coingecko_data(url, params=None, retries=5, delay=60):
    for attempt in range(retries):
        try:
            response = requests.get(url, headers={'x-cg-demo-api-key': CG_API_KEY}, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 429:  # Rate limit error
                print(f"Rate limit hit on attempt {attempt + 1}/{retries}. Retrying in {delay} seconds...")
                time.sleep(delay)  # Wait for the specified delay
            else:
                print(f"Error fetching data from CoinGecko on attempt {attempt + 1}: {e}")
                return None
        except requests.RequestException as e:
            print(f"Error fetching data from CoinGecko on attempt {attempt + 1}: {e}")
            return None
    print("Max retries reached. Failed to fetch data from CoinGecko.")
    return None

@sleep_and_retry
@limits(calls=30, period=timedelta(seconds=61).total_seconds())
def get_coinmarketcap_data(symbol, retries=5, delay=60):
    for attempt in range(retries):
        try:
            response = cmc.cryptocurrency_info(symbol=symbol)
            return response.data
        except CoinMarketCapAPIError as e:
            if e.rep and e.rep.status and e.rep.status.get('error_code') == 429:  # Rate limit error
                print(f"Rate limit hit on CoinMarketCap on attempt {attempt + 1}/{retries}. Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                error_message = e.rep.status.get('error_message') if e.rep and e.rep.status else 'Unknown error'
                print(f"Error fetching data from CoinMarketCap on attempt {attempt + 1}: {error_message}. Retrying in {delay} seconds...")
                time.sleep(delay)
        except Exception as e:
            if attempt < retries - 1:
                print(f"Exception fetching data from CoinMarketCap on attempt {attempt + 1}: {e}. Retrying in {delay} seconds...")
                time.sleep(delay)
            else:
                print(f"Exception fetching data from CoinMarketCap on final attempt: {e}")
                return None
    print("Max retries reached. Failed to fetch data from CoinMarketCap.")
    return None

# Utility Functions
def create_dataframe_from_response(response):
    if response:
        return pd.DataFrame.from_dict(response)
    else:
        return pd.DataFrame()

def add_coingecko_columns(df):
    homepages = []
    chains = []
    contract_addresses = []
    coingecko_watchers = []
    price_change_percentage_7d = []
    price_change_percentage_14d = []
    price_change_percentage_30d = []
    price_change_percentage_60d = []
    for coin_id in df['id']:
        coin_data = get_coingecko_data(COINGECKO_COIN_API_URL + coin_id)
        if coin_data:
            # Homepage
            homepage = coin_data['links']['homepage'][0] if 'links' in coin_data and 'homepage' in coin_data['links'] else None
            homepages.append(homepage)

            # Chain and Contract Address
            asset_platform_id = coin_data.get('asset_platform_id', 0)
            detail_platforms = coin_data.get('detail_platforms', 0)
            if asset_platform_id and detail_platforms:
                chain = asset_platform_id
                contract_address = detail_platforms.get(asset_platform_id, {}).get('contract_address', 0)
            else:
                chain = contract_address = None
            chains.append(chain)
            contract_addresses.append(contract_address)

            # Coingecko Watchers
            coingecko_watchers.append(coin_data.get('watchlist_portfolio_users', 0))

            # Price Change Percentages
            market_data = coin_data.get('market_data', {})
            price_change_percentage_7d.append(market_data.get('price_change_percentage_7d_in_currency', {}).get('usd', 0))
            price_change_percentage_14d.append(market_data.get('price_change_percentage_14d_in_currency', {}).get('usd', 0))
            price_change_percentage_30d.append(market_data.get('price_change_percentage_30d_in_currency', {}).get('usd', 0))
            price_change_percentage_60d.append(market_data.get('price_change_percentage_60d_in_currency', {}).get('usd', 0))

    # Add new columns to DataFrame
    df['homepage'] = homepages
    df['chain'] = chains
    df['contract_address'] = contract_addresses
    df['coingecko_watchers'] = coingecko_watchers
    df['price_change_percentage_7d'] = price_change_percentage_7d
    df['price_change_percentage_14d'] = price_change_percentage_14d
    df['price_change_percentage_30d'] = price_change_percentage_30d
    df['price_change_percentage_60d'] = price_change_percentage_60d
 

def mature_dataframe(df):
    platforms = []
    platform_icon_urls = []
    for symbol in df['symbol']:
        symbol_cleaned = symbol.strip(STRIP_CHARS).upper()
        cmc_data = get_coinmarketcap_data(symbol_cleaned)
        
        # Extract platform data
        platform_url = None
        platform_name = None
        if cmc_data and symbol_cleaned in cmc_data:
            coin_info = cmc_data[symbol_cleaned][0]
            if 'platform' in coin_info and coin_info['platform']:
                platform_name = coin_info['platform']['name'].lower()
                platform_url = CHAIN_API_URL.replace('token', platform_name)
        platforms.append(platform_name or symbol_cleaned)
        platform_icon_urls.append(platform_url or CHAIN_API_URL.replace('token', symbol_cleaned.lower()))

    # Check if the length of platforms matches the length of the DataFrame excluding the title row
    if len(platforms) == len(df):
        # Add 'platform' and 'platform_icon_url' columns to DataFrame
        df['platform'] = platforms  # Add None for the title row
        df['platform_icon_url'] = platform_icon_urls # Add None for the title row
    else:
        print("Error: Length of 'platforms' list does not match the length of the DataFrame.")
        # Reset index for proper comparison
        df_reset = df.reset_index(drop=True)
        non_matching_rows = df_reset[~df_reset['symbol'].isin(platforms) | ~df_reset['symbol'].isin(platform_icon_urls)]
        print("Rows not contained in both:")
        print(non_matching_rows)
    return df

# Main Logic
params = {
    'vs_currency': 'USD',
    'category': '113',
    'order': 'market_cap_desc',
    'per_page': '250'
}

server = True

if server:
    app = Flask(__name__)
    CORS(app)
    @app.route('/api/enriched_coingecko_data', methods=['GET'])
    def get_enriched_coingecko_data():
        print("Checking if data needs update...")
        if data_needs_update():
            print("Data needs update. Fetching new data...")
            params = {
                'vs_currency': 'USD',
                'category': '113',
                'order': 'market_cap_desc',
                'per_page': '250'
            }
            response = get_coingecko_data(COINGECKO_API_URL, params)
            
            if response is None:
                print("Failed to fetch data from CoinGecko.")
                return jsonify({"error": "Failed to fetch data from CoinGecko"}), 500

            print("Creating dataframe from response...")
            df = create_dataframe_from_response(response)
            df_filtered = df[(df['market_cap'] >= 10000000)]
            
            if len(df_filtered) > 29:
                df_filtered = df_filtered.head(29)
            print("Adding Coingecko columns...")
            add_coingecko_columns(df_filtered)
            print("Maturing dataframe...")
            df_enriched = mature_dataframe(df_filtered)
            print("Saving data...")
            chains = ['ethereum', 'arbitrum', 'solana']
            df_enriched = df_enriched[df_enriched['platform'].isin(chains)]
            save_data(df_enriched.to_dict(orient='records'))
        else:
            print("Loading data from file...")
            df_enriched = load_data()['data']
            # Convert the data to a DataFrame before returning
            df_enriched = pd.DataFrame(df_enriched)

        print("Returning data...")
        # Convert DataFrame to a list of dictionaries for JSON serialization
        return jsonify(df_enriched.to_dict(orient='records'))

# Run Flask App
    if __name__ == '__main__':
        app.run(host='0.0.0.0', port=int(os.environ.get("PORT", 5000)), debug=False)
    
else:
    response = get_coingecko_data(COINGECKO_API_URL, params)
    df = create_dataframe_from_response(response)
    df_filtered = df[(df['market_cap'] >= 10000000)]
    df_filtered.to_csv('filtered_coingecko_data.csv')
    add_coingecko_columns(df_filtered)

    # Save intermediate dataframe if needed
    df_filtered.to_csv('filtered_coingecko_data_with_homepage.csv')

    # Further processing on df_filtered
    df_enriched = mature_dataframe(df_filtered)
    
    chains = ['ethereum', 'binance-smart-chain', 'arbitrum-one', 'solana']
    df_enriched = df_enriched[df_enriched['chain'].isin(chains)]

# Step 2: Limit to first 29 rows if there are more than 29
    if len(df_enriched) > 29:
        df_enriched = df_enriched.head(29)
    df_enriched.to_csv('enriched_coingecko_data.csv')