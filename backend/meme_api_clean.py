import requests
import warnings
import pandas as pd
from pandas.core.common import SettingWithCopyWarning
from ratelimit import limits, sleep_and_retry
from datetime import timedelta
from coinmarketcapapi import CoinMarketCapAPI
warnings.simplefilter(action="ignore", category=SettingWithCopyWarning)


# Constants
COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/coins/markets'
COINGECKO_COIN_API_URL = 'https://api.coingecko.com/api/v3/coins/'
CHAIN_API_URL = 'https://icons.llamao.fi/icons/chains/rsz_token?w=48&h=48'
STRIP_CHARS = '!?@#$.'
CMC_API_KEY = '02630e73-8ed0-48f7-80ce-a60398599468'  
CG_API_KEY = 'CG-wkaU3WnSmWTxKcCYfhSezwMF'
# Initialize CoinMarketCapAPI
cmc = CoinMarketCapAPI(CMC_API_KEY)

# Rate Limit Decorators
@sleep_and_retry
@limits(calls=29, period=timedelta(seconds=62).total_seconds())
def get_coingecko_data(url, params=None):
    try:
        response = requests.get(url, headers={'x-cg-demo-api-key': CG_API_KEY}, params=params)
        response.raise_for_status()
        print(response.text)
        return response.json()

    except requests.RequestException as e:
        print(f"Error fetching data from CoinGecko: {e}")
        return None

@sleep_and_retry
@limits(calls=29, period=timedelta(seconds=61).total_seconds())
def get_coinmarketcap_data(symbol):
    try:
        response = cmc.cryptocurrency_info(symbol=symbol)
        return response.data if response else None
    except Exception as e:
        print(f"Error fetching data from CoinMarketCap: {e}")
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
    telegram_users = []

    for coin_id in df['id']:
        coin_data = get_coingecko_data(COINGECKO_COIN_API_URL + coin_id)
        if coin_data:
            # Homepage
            homepage = coin_data['links']['homepage'][0] if 'links' in coin_data and 'homepage' in coin_data['links'] else None
            homepages.append(homepage)

            # Chain and Contract Address
            asset_platform_id = coin_data.get('asset_platform_id', None)
            detail_platforms = coin_data.get('detail_platforms', None)
            if asset_platform_id and detail_platforms:
                chain = asset_platform_id
                contract_address = detail_platforms.get(asset_platform_id, {}).get('contract_address', None)
            else:
                chain = contract_address = None
            chains.append(chain)
            contract_addresses.append(contract_address)

            # Coingecko Watchers
            coingecko_watchers.append(coin_data.get('watchlist_portfolio_users', None))

            # Price Change Percentages
            market_data = coin_data.get('market_data', {})
            price_change_percentage_7d.append(market_data.get('price_change_percentage_7d_in_currency', {}).get('usd', None))
            price_change_percentage_14d.append(market_data.get('price_change_percentage_14d_in_currency', {}).get('usd', None))
            price_change_percentage_30d.append(market_data.get('price_change_percentage_30d_in_currency', {}).get('usd', None))
            price_change_percentage_60d.append(market_data.get('price_change_percentage_60d_in_currency', {}).get('usd', None))

            # Telegram Users
            community_data = coin_data.get('community_data', {})
            telegram_users.append(community_data.get('telegram_channel_user_count', None))

    # Add new columns to DataFrame
    df['homepage'] = homepages
    df['chain'] = chains
    df['contract_address'] = contract_addresses
    df['coingecko_watchers'] = coingecko_watchers
    df['price_change_percentage_7d'] = price_change_percentage_7d
    df['price_change_percentage_14d'] = price_change_percentage_14d
    df['price_change_percentage_30d'] = price_change_percentage_30d
    df['price_change_percentage_60d'] = price_change_percentage_60d
    df['telegram_users'] = telegram_users


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

response = get_coingecko_data(COINGECKO_API_URL, params)
df = create_dataframe_from_response(response)


df_filtered = df[(df['market_cap'] >= 10000000)]
df_filtered.to_csv('filtered_coingecko_data.csv')

add_coingecko_columns(df_filtered)

# Save intermediate dataframe if needed
df_filtered.to_csv('filtered_coingecko_data_with_homepage.csv')

# Further processing on df_filtered
df_enriched = mature_dataframe(df_filtered)
df_enriched.to_csv('enriched_coingecko_data.csv')
