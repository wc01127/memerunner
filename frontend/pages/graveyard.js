import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';

export default function YourPageName() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          const formattedAddress = `${accounts[0].substring(0, 7)}...${accounts[0].substring(accounts[0].length - 5)}`;
          setWalletAddress(formattedAddress);
          setIsConnected(true);
        }
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Initialize the audio object here
    const newAudio = new Audio('/Drift.mp3');
    newAudio.loop = true;
    newAudio.volume = 0.1;
    setAudio(newAudio);
    // Play the audio
    newAudio.play().catch(error => console.error('Error playing audio:', error));
    // Cleanup function
    return () => newAudio.pause();
  }, []);

  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('https://meme-runner-server-1c735c2018ad.herokuapp.com/api/graveyard_coingecko_data')
        .then(response => response.json())
        .then(data => {
            const filteredAndSortedCoins = data
                .filter(coin => 
                    coin.market_cap_24h > 0 ||
                    coin.market_cap_7d > 0 ||
                    coin.market_cap_14d > 0 ||
                    coin.market_cap_30d > 0 ||
                    coin.market_cap_60d > 0
                )
                .sort((a, b) => {
                    const timeA = getTimeValue(a);
                    const timeB = getTimeValue(b);
                    return timeA - timeB;
                });
            setCoins(filteredAndSortedCoins);
        })
        .catch(error => console.error('Error fetching graveyard data:', error));
}, []);

    const getTimeValue = (coin) => {
        if (coin.market_cap_24h > 0) return 1;
        if (coin.market_cap_7d > 0) return 2;
        if (coin.market_cap_14d > 0) return 3;
        if (coin.market_cap_30d > 0) return 4;
        if (coin.market_cap_60d > 0) return 5;
        return 6; // Should not reach here if filtered correctly
    };

    const getBurialTimeText = (coin) => {
        if (coin.market_cap_24h > 0) return "Dead 1 Day";
        if (coin.market_cap_7d > 0) return "Dead 1 Week";
        if (coin.market_cap_14d > 0) return "Dead 2 Weeks";
        if (coin.market_cap_30d > 0) return "Dead 1 Month";
        if (coin.market_cap_60d > 0) return "Dead 2 Months";
        return ""; // Fallback, should not reach here if filtered correctly
    };


  return (
    <main className="main-background flex min-h-screen flex-col items-center justify-center p-2.5 bg-no-repeat bg-cover bg-center relative">
      <Head>
        <title>Graveyard - Meme Runner</title>
      </Head>
    <video id="background-video" autoPlay loop muted>
        <source src="/graveyard_background.mp4" type="video/mp4"></source>
    </video> 
      <div className="title-button-container w-full">
      <button className="button-connect-wallet neon-button px-6 py-3 font-cyberpunk invisible-spacer">
            Connect Wallet
        </button>
        <h1 className="title-background neon-title neon-title-main text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Graveyard</h1>
        <button
          onClick={isConnected ? disconnectWallet : connectWallet}
          className="button-connect-wallet neon-button px-6 py-3 font-cyberpunk"
        >
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </button>
        {isConnected && walletAddress && (
          <div className="wallet-address neon-title font-cyberpunk text-cyberpunkYellow">
            {walletAddress}
          </div>
        )}
      </div>

      
      <Link href="/make">
        <button className="button-make font-cyberpunk">
        M<br/>A<br/>K<br/>E
        </button>
      </Link>

      <Link href="/take">
      <button className="button-take font-cyberpunk">
        T<br/>A<br/>K<br/>E
      </button>
      </Link>

      <div className="coins-section">
        <div className="coins-container">
          {coins.map((coin, index) => (
            <div key={index} className="coin">
              <div className="coin-image-container">
                <img src={coin.image} alt={coin.symbol.toUpperCase()} className="coin-image graveyard-coin-image" />
              </div>
              <div className="coin-name neon-title font-cyberpunk">{coin.symbol.toUpperCase()}</div>
              <div className="coin-value grave-value font-cyberpunk">{getBurialTimeText(coin)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="graveyard-button-container">
        <Link href="/" className="grave-button font-cyberpunk">H O M E</Link>
      </div>

      <div class="watermark">
      <img src="/watermark4.png" alt="Watermark" />
      <img src="/robot.gif" className="robot-gif" alt="Robot Animation" />
    </div>

    <div className="watermark2">
          <img src="/ratatat_mark2.png" alt="Watermark2" />
          <Link href="/dancehall">
            <img src="/ape.gif" className="ape-gif" alt="Ape Animation" />
          </Link>
        </div>
    </main>
  );
}