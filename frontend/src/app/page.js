'use client'
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentChainId, setCurrentChainId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [coins, setCoins] = useState([]);

  function replaceNaNWithNull(data) {
    if (Array.isArray(data)) {
      return data.map(item => replaceNaNWithNull(item));
    } else if (typeof data === 'object' && data !== null) {
      const newData = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          newData[key] = replaceNaNWithNull(data[key]);
        }
      }
      return newData;
    } else if (typeof data === 'number' && isNaN(data)) {
      return null;
    }
    return data;
  }

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          const formattedAddress = `${accounts[0].substring(0, 7)}...${accounts[0].substring(accounts[0].length - 5)}`;
          setWalletAddress(formattedAddress);
          setIsConnected(true);
          const chainId = await window.ethereum.request({ method: 'eth_chainId' });
          setCurrentChainId(chainId);
        }
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  const disconnectWallet = () => {
    console.log('Disconnecting wallet');
    setIsConnected(false);
    setCurrentChainId('');
  };
  

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', (chainId) => {
        setCurrentChainId(chainId);
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('chainChanged', setCurrentChainId);
      }
    };
  }, []);

  useEffect(() => {
    const ufo1 = document.querySelector('.ufo1');
    const titleHeight = document.querySelector('h1').offsetHeight; // Height of the title
    const screenHeight = window.innerHeight;
    const randomizeUfo1Position = () => {
      const topPosition = Math.random() * (screenHeight / 2 - ufo1.clientHeight) + titleHeight;
      ufo1.style.top = `${topPosition}px`;
    };
  
    randomizeUfo1Position();
    ufo1.addEventListener('animationiteration', randomizeUfo1Position);
  
    return () => ufo1.removeEventListener('animationiteration', randomizeUfo1Position);
  }, []);

  useEffect(() => {
    const ufo2 = document.querySelector('.ufo2');
  
    const animateUfo2 = () => {
      // Reset animation to trigger reflow, allowing animation to restart
      ufo2.style.animation = 'none';
      setTimeout(() => {
        ufo2.style.animation = 'ufo2Animation 4s linear';
      }, 0);
  
      // Schedule next appearance
      const nextAppearanceDelay = Math.random() * (13 - 4) + 4; // Random delay between 4 and 13 seconds
      setTimeout(animateUfo2, nextAppearanceDelay * 1000 + 4000); // Wait for current animation to finish
    };
  
    // Initial call to animate UFO
    setTimeout(animateUfo2, 1000); // Start after a short delay
  
    return () => {
      // Cleanup if needed
    };
  }, []);

  

  useEffect(() => {
    const bombs = document.querySelectorAll('.bomb');
  
    const randomizeBomb = (bomb) => {
      const screenHeight = window.innerHeight;
      const top = Math.random() * (screenHeight / 2 - bomb.clientHeight) + screenHeight / 2;
      const left = Math.random() * (window.innerWidth - bomb.clientWidth);
      bomb.style.top = `${top}px`;
      bomb.style.left = `${left}px`;
    };
  
    // Set initial positions
    bombs.forEach(bomb => randomizeBomb(bomb));
  
    // Start intervals for random positioning
    const intervals = Array.from(bombs).map(bomb => {
      return setInterval(() => {
        randomizeBomb(bomb);
      }, Math.random() * 3400 + 1700); // Random interval between 3 to 8 seconds
    });
  
    // Clear intervals on unmount
    return () => {
      intervals.forEach(interval => clearInterval(interval));
    };
  }, []);

  useEffect(() => {
    fetch('https://meme-runner-server-1c735c2018ad.herokuapp.com/api/enriched_coingecko_data')
      .then(response => response.json())
      .then(data => {
        const cleanedData = replaceNaNWithNull(data); // Use the function to clean data
        const filteredCoins = cleanedData.filter(coin => coin && coin.image);
        setCoins(filteredCoins);
      })
      .catch(error => {
        console.error('Error fetching coin data:', error);
      });
  }, []);

  const [audio] = useState(new Audio('/background_music.mp3'));

  useEffect(() => {
    audio.loop = true;
    audio.muted = true; // Start muted
    audio.play()
      .catch(error => console.error('Error playing audio:', error));
  }, [audio]);

  const handleMouseEnter = () => {
    audio.muted = false;
    if (audio.paused) {
      audio.play();
    }
  };
  

  return (
    <main className="main-background flex min-h-screen flex-col items-center justify-start p-2.5 bg-no-repeat bg-cover bg-center relative"
      //style={{ backgroundImage: "url('/memerunner2.png')" }}
    >
      <img src="/ufo1.gif" className="ufo ufo1" />
      <img src="/ufo2.gif" className="ufo ufo2" />
      <img src="/bomb.gif" className="bomb bomb1" />
      <img src="/robot.gif" className="robot-gif" alt="Robot Animation" />


      {/* Title and button container */}
      <div className="title-button-container w-full">
        {/* Invisible spacer with the same dimensions as the button */}
        <button className="button-connect-wallet neon-button px-6 py-3 font-cyberpunk invisible-spacer">
            Connect Wallet
        </button>

        <h1 className="neon-title text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Meme Runner</h1>
        <div>
        <button
            onClick={isConnected ? disconnectWallet : connectWallet}
            onMouseOver={e => isConnected ? e.target.textContent = 'Disconnect' : null}
            onMouseOut={e => e.target.textContent = isConnected ? 'Connected' : 'Connect Wallet'}
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
      </div>

      {isConnected && currentChainId !== '0xa0c71fd' && (
                  <div className="notification-text neon-title font-cyberpunk">
              You are connected, but not on the right chain. Please switch to the 
              <a href="https://docs.blast.io/using-blast" target="_blank" rel="noopener noreferrer">
                  <img 
                      src="/logo-glow.png" 
                      alt="Blast" 
                      style={{ 
                          height: '1em', 
                          verticalAlign: '-2px', 
                          display: 'inline', 
                          opacity: 0.95  // Adjust transparency as needed
                      }} 
                  />
              </a>
              network.
          </div>
      )}
    <div className="coins-container" onMouseEnter={handleMouseEnter}>
      {coins.map((coin, index) => (
          <div key={index} className="coin">
          <div className="coin-image-container">
            <img src={coin.image} alt={coin.name} className="coin-image" />
          </div>
          <div className="coin-name neon-title font-cyberpunk">{coin.name}</div>
        </div>
      ))}
    </div>
    <video id="background-video" autoPlay loop muted>
        <source src="/memerunner_background.mp4" type="video/mp4"></source>
    </video> 
    <img src="/watermark3.png" className="watermark" alt="Watermark" />
    
  </main>
  );}

