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

  const handlePlatformSelection = (selectedPlatform) => {
    setPlatform(selectedPlatform);
    setCurrentStep('memecoinSelection');
  };

  // Function to handle memecoin selection
  const handleMemecoinSelection = (coin) => {
    setSelectedMemecoin(coin);
    setCurrentStep('timeframeSelection');
  };

  const handleBack = () => {
    const stepOrder = ['platformSelection', 'memecoinSelection', 'timeframeSelection', 'directionSelection', 'amountSelection'];
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      const previousStep = stepOrder[currentIndex - 1];
      setCurrentStep(previousStep);

      // Reset state based on the step moving back to
      if (previousStep === 'platformSelection') {
        setPlatform('');
        setSelectedMemecoin(null);
      } else if (previousStep === 'memecoinSelection') {
        setSelectedMemecoin(null);
      } else if (previousStep === 'timeframeSelection') {
        setTimeframe('');
      } else if (previousStep === 'directionSelection') {
        setDirection('');
      }
    }
  };

  const convertTimeframeToUnix = (timeframe) => {
    const now = Date.now(); // Current time in milliseconds
    let durationInSeconds;
    switch (timeframe) {
      case '1 week':
        durationInSeconds = 1 * 7 * 24 * 60 * 60;
        break;
      case '2 weeks':
        durationInSeconds = 2 * 7 * 24 * 60 * 60;
        break;
      case '3 weeks':
        durationInSeconds = 3 * 7 * 24 * 60 * 60;
        break;
      case '4 weeks':
        durationInSeconds = 4 * 7 * 24 * 60 * 60;
        break;
      default:
        durationInSeconds = 0; // Default case, should not happen
    }
    return Math.floor(now / 1000) + durationInSeconds; // Convert milliseconds to seconds and add duration
  };

  const handleMakeBet = () => {
    const betEndTime = convertTimeframeToUnix(timeframe);
    const rawMetricCurrentValue = platform === 'gdelt' ? 
        selectedMemecoin.gdelt_7d : 
        selectedMemecoin.farcaster_7d;
    const metricCurrentValue = Math.floor(parseFloat(rawMetricCurrentValue) * 100);
    const betDetails = {
      platform,
      memecoin: selectedMemecoin.symbol,
      metricCurrentValue,
      betEndTime,
      outcomeDirection: direction,
      amount,
      walletAddress, // Assuming walletAddress is already defined and holds the user's address
    };

    // Implement the logic to send betDetails to your smart contract here
    console.log("Finalizing bet with details:", betDetails);
  };

  useEffect(() => {
    const fetchMemecoins = async () => {
      const response = await fetch('https://meme-runner-0fde5367bf4b.herokuapp.com/api/enriched_coingecko_data');
      const data = await response.json();
      // Filter coins based on the selected platform
      const filteredCoins = data.filter(coin => platform === 'gdelt' ? coin.gdelt_7d > 0 : coin.farcaster_7d > 0);
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
  <div className='platform-text'><h1>Select Platform</h1></div>
  <br></br>
  <button onClick={() => handlePlatformSelection('gdelt')} className={`platform-button ${platform === 'gdelt' ? 'selected' : ''}`}>GDELT 2.0</button>
          <button onClick={() => handlePlatformSelection('farcaster')} className={`platform-button ${platform === 'farcaster' ? 'selected' : ''}`}>Farcaster</button>
  
</div>
      )}

      {platform && selectedMemecoin === null && (
        <div className="memecoin-selection">
          <center><div className="memecoin-selection-text-out"><div className="memecoin-selection-text"><h2>Select Memecoin</h2></div></div></center><br></br>
          <div className="grid grid-cols-3 gap-4">
            {memecoins.map((coin) => (
            <div key={coin.id} className="memecoin" onClick={() => handleMemecoinSelection(coin)}>
            <Image src={coin.image} alt={coin.symbol} width={50} height={50} />
            <span>{coin.symbol.toUpperCase()}</span>
            <span>{platform === 'gdelt' ? `${coin.gdelt_7d}%` : `${coin.farcaster_7d}%`}</span>
          </div>
            ))}
          </div>
         <center><button onClick={handleBack} className="back-button">Back</button></center>

        </div>
      )}


      {selectedMemecoin && (
        <>
        <div className="selected-platform-outer">
        <div className="selected-platform">
          <span>{platform.toUpperCase()}</span>
        </div></div>
        <div className="selected-memecoin-container">
        <div className="selected-memecoin">
              <Image src={selectedMemecoin.image} alt={selectedMemecoin.symbol} width={50} height={50} />
              <span>{selectedMemecoin.symbol.toUpperCase()}</span>
              <span>{platform === 'gdelt' ? `${selectedMemecoin.gdelt_7d}%` : `${selectedMemecoin.farcaster_7d}%`}</span>
            </div></div>
          <div className="timeframe-selection">
          <div className='platform-text'><center><h2>Select Timeframe</h2></center></div>
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
              <div className='platform-text'><center><h2>Select Direction</h2></center></div>
              <button
                onClick={() => setDirection('increase')}
                className={direction === 'increase' ? 'selected' : ''}
              >
                Increase
              </button>
              <button
                onClick={() => setDirection('decrease')}
                className={direction === 'decrease' ? 'selected' : ''}
              >
                Decrease
              </button>
            </div>
          )}

          {direction && (
            <div className="amount-selection">
              <div className='platform-text'><center><h2>Enter ETH Bet Amount</h2></center></div>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} min="0" />
              <button onClick={() => console.log("Amount entered:", amount)}>Enter</button>
            </div>
          )}

          {amount && (
            <div className="finalize-bet">
              <div className='platform-text'><center><h2>Finalize Bet</h2></center></div>
              <button onClick={handleMakeBet}>Make Bet</button>
            </div>
          )}

{currentStep !== 'platformSelection' && (
        <button onClick={handleBack} className="back-button">Back</button>
      )}



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
