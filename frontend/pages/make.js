import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';

export default function Make() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [platform, setPlatform] = useState('');
  const [memecoins, setMemecoins] = useState([]);
  const [selectedMemecoin, setSelectedMemecoin] = useState(null);
  const [timeframe, setTimeframe] = useState('');
  const [direction, setDirection] = useState('');
  const [amount, setAmount] = useState('');
  const [currentStep, setCurrentStep] = useState('platformSelection');

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

  const handleBack = () => {
    switch(currentStep) {
      case 'timeframeSelection':
        setSelectedMemecoin(null);
        setCurrentStep('memecoinSelection');
        break;
      case 'memecoinSelection':
        setPlatform('');
        setCurrentStep('platformSelection');
        break;
      case 'directionSelection':
        setTimeframe('');
        setCurrentStep('timeframeSelection');
        break;
      // Continue for other steps as necessary
      default:
        // Handle default case or error
    }
  };

  useEffect(() => {
    const fetchMemecoins = async () => {
      const response = await fetch('https://meme-runner-0fde5367bf4b.herokuapp.com/api/enriched_coingecko_data');
      const data = await response.json();
      const filteredCoins = data.filter(coin => coin.gdelt_7d > 0);
      setMemecoins(filteredCoins);
    };

    if (platform) {
      fetchMemecoins();
    }
  }, [platform]);

  return (
    <main className="main-background flex min-h-screen flex-col items-center justify-center p-2.5 bg-no-repeat bg-cover bg-center relative">
      <Head>
        <title>Makers Factory - Meme Runner</title>
      </Head>
      <video id="background-video" autoPlay loop muted>
        <source src="/factory_background.mp4" type="video/mp4" />
      </video>

      <div className="title-button-container w-full">
      <button className="button-connect-wallet neon-button px-6 py-3 font-cyberpunk invisible-spacer">
            Connect Wallet
        </button>
        <h1 className="title-background neon-title neon-title-main text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Makers Factory</h1>
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

      {platform === '' && (
        <div className="platform-selection" style={{ textAlign: 'center', margin: '20px 0' }}>
  <h2>Select Platform</h2>
  <button
    onClick={() => setPlatform('gdelt')}
    className={`platform-button ${platform === 'gdelt' ? 'selected' : ''}`}
  >
    GDELT 2.0
  </button>
  <button
    onClick={() => setPlatform('farcaster')}
    className={`platform-button ${platform === 'farcaster' ? 'selected' : ''}`}
  >
    Farcaster
  </button>
</div>
      )}

      {platform && selectedMemecoin === null && (
        <div className="memecoin-selection">
          <center><h2>Select Memecoin</h2></center>
          <div className="grid grid-cols-3 gap-4">
            {memecoins.map((coin) => (
              <div key={coin.id} className="memecoin" onClick={() => setSelectedMemecoin(coin)}>
                <Image src={coin.image} alt={coin.symbol} width={50} height={50} />
                <span>{coin.symbol.toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedMemecoin && (
        <>
          <div className="timeframe-selection">
            <h2>Select Timeframe</h2>
            <select value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className="timeframe-select">
              <option value="">--Please choose an option--</option>
              <option value="1 week">1 week</option>
              <option value="2 weeks">2 weeks</option>
              <option value="3 weeks">3 weeks</option>
              <option value="4 weeks">4 weeks</option>
            </select>
          </div>

          {timeframe && (
            <div className="direction-selection">
              <h2>Select Direction</h2>
              <button onClick={() => setDirection('increase')}>Increase</button>
              <button onClick={() => setDirection('decrease')}>Decrease</button>
            </div>
          )}

          {direction && (
            <div className="amount-selection">
              <h2>Select ETH Bet Amount</h2>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" />
              <button onClick={() => console.log("Amount entered:", amount)}>Enter</button>
            </div>
          )}

          {amount && (
            <div className="finalize-bet">
              <h2>Finalize Bet</h2>
              <button onClick={() => console.log({
                platform,
                memecoin: selectedMemecoin.symbol,
                timeframe,
                outcome: direction,
                amount,
                wallet: walletAddress,
                ID: "PlaceholderID"
              })}>Make Bet</button>
            </div>
          )}

          <Link href="/">
            {currentStep !== 'platformSelection' && (
              <button onClick={handleBack} className="back-button">Back</button>
            )}
          </Link>

        </>
      )}

      <Link href="/">
        <button className="button-make font-cyberpunk">
          H<br />O<br />M<br />E
        </button>
      </Link>

      <Link href="/take">
        <button className="button-take font-cyberpunk">
          T<br />A<br />K<br />E
        </button>
      </Link>

      <div className="graveyard-button-container">
        <Link href="/graveyard" className="grave-button font-cyberpunk">G R A V E S</Link>
      </div>

      <div className="watermark">
        <img src="/watermark5.png" alt="Watermark" />
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
