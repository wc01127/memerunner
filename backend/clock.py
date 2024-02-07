import requests
import os
import time
import json
import pandas as pd
from datetime import datetime, timedelta
from apscheduler.schedulers.blocking import BlockingScheduler
from ratelimit import limits, sleep_and_retry
from coinmarketcapapi import CoinMarketCapAPI, CoinMarketCapAPIError
import logging
import boto3
# Other imports...

logging.basicConfig(level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(name)s - %(message)s')


# Constants as in your original file
COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets'
COINGECKO_COIN_API_URL = 'https://api.coingecko.com/api/v3/coins/'
CHAIN_API_URL = 'https://icons.llamao.fi/icons/chains/rsz_token?w=48&h=48'
STRIP_CHARS = '!?@#$.'
CMC_API_KEY1 = '02630e73-8ed0-48f7-80ce-a60398599468'
CMC_API_KEY2 = 'be176b0c-2b5c-47b2-8514-379678814ecd'
CG_API_KEY1 = 'CG-wkaU3WnSmWTxKcCYfhSezwMF'
CG_API_KEY2 = 'CG-39fGudHnptWEPKn3wwaXknEy'
DATA_FILE_PATH_MAIN = 'enriched_data.json'
DATA_FILE_PATH_GRAVE = 'graveyard_data.json'


# Rate Limit Decorators
@sleep_and_retry
@limits(calls=30, period=60)  # Adjusted to 30 calls per minute
def rate_limited_get_request(url, headers=None, params=None):
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    return response.json()

@sleep_and_retry
@limits(calls=15, period=timedelta(seconds=30).total_seconds())
def get_coingecko_data(url, data_type, params=None, retries=5, delay=60):
    CG_API_KEY = None
    if data_type == 'main':
        CG_API_KEY = CG_API_KEY1
    if data_type == 'grave':
        CG_API_KEY = CG_API_KEY2
    for attempt in range(retries):
        try:
            return rate_limited_get_request(url, headers={'x-cg-demo-api-key': CG_API_KEY}, params=params)
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

def save_data_s3(data, data_type):
    s3 = boto3.resource('s3')
    bucket_name = 'memerunner'  # Your S3 Bucket name
    if data_type == 'main':
        file_name = 'enriched_data.json'
    else:  # 'grave'
        file_name = 'graveyard_data.json'
    s3_object = s3.Object(bucket_name, file_name)
    s3_object.put(Body=json.dumps(data, indent=2).encode('utf-8'))


def create_dataframe_from_response(response):
    if response:
        return pd.DataFrame.from_dict(response)
    else:
        return pd.DataFrame()

def get_coinmarketcap_data(symbol, data_type):
    cmc_api_key = CMC_API_KEY1 if data_type == 'main' else CMC_API_KEY2
    cmc = CoinMarketCapAPI(cmc_api_key)
    response = cmc.cryptocurrency_info(symbol=symbol)
    return response.data

def add_market_cap_columns(df, threshold):
    # Define the threshold
    # Time intervals
    intervals = ['24h', '7d', '14d', '30d', '60d']
    
    # Loop through each time interval and calculate the historical market cap
    for interval in intervals:
        percentage_change_col = f'price_change_percentage_{interval}'
        
        # Calculate historical market cap based on the percentage change
        df[f'market_cap_{interval}'] = df['market_cap'] / (1 + df[percentage_change_col] / 100)
        
        # Apply threshold: if historical market cap < threshold, set to 0, else keep the calculated value
        df[f'market_cap_{interval}'] = df[f'market_cap_{interval}'].apply(lambda x: x if x >= threshold else 0)
    
    return df

def add_coingecko_columns(df, data_type):
    homepages = []
    chains = []
    contract_addresses = []
    coingecko_watchers = []
    price_change_percentage_7d = []
    price_change_percentage_14d = []
    price_change_percentage_30d = []
    price_change_percentage_60d = []
    for coin_id in df['id']:
        coin_data = get_coingecko_data(COINGECKO_COIN_API_URL + coin_id, data_type)
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
    df['price_change_percentage_24h'] = (df['price_change_24h'] / (df['current_price'] - df['price_change_24h'])) * 100

def mature_dataframe(df, data_type):
    platforms = []
    platform_icon_urls = []
    for symbol in df['symbol']:
        symbol_cleaned = symbol.strip(STRIP_CHARS).upper()
        cmc_data = get_coinmarketcap_data(symbol_cleaned, data_type)
        
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


def fetch_and_process_data():
    # Fetch data
    logging.info("Starting data fetch and process.")
    try:
        params = {
            'vs_currency': 'USD',
            'category': '113',
            'order': 'market_cap_desc',
            'per_page': '250'
        }
        data_main = get_coingecko_data(COINGECKO_API_URL, 'main', params=params)
        data_grave = get_coingecko_data(COINGECKO_API_URL, 'grave', params=params)  # Adjust params as needed

        df_main = create_dataframe_from_response(data_main)
        df_grave = create_dataframe_from_response(data_grave)

        market_cap_threshold = df_main.iloc[28]['market_cap']
        df_grave = df_grave.iloc[29:]
        if len(df_grave) > 29:
                    df_grave = df_grave.head(29)
        if len(df_main) > 29:
                    df_main = df_main.head(29)  
        add_coingecko_columns(df_main, 'main')
        add_coingecko_columns(df_grave, 'grave')
        df_grave = add_market_cap_columns(df_grave, market_cap_threshold)
        save_data_s3(df_grave.to_dict(orient='records'), 'grave')
        save_data_s3(df_main.to_dict(orient='records'), 'main')
    except Exception as e:
        logging.exception("An error occurred during fetch and process.")
   
if __name__ == '__main__':
    scheduler = BlockingScheduler()
    scheduler.add_job(fetch_and_process_data, 'interval', hours=2, next_run_time=datetime.now())
    logging.info("Scheduler started.")
    scheduler.start()
