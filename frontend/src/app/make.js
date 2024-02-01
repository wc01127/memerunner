'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Make() {
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

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Initialize the audio object here
    const newAudio = new Audio('/background_music.mp3');
    newAudio.loop = true;
    setAudio(newAudio);

    // Play the audio
    newAudio.play().catch(error => console.error('Error playing audio:', error));

    // Cleanup function
    return () => newAudio.pause();
  }, []);
  

  return (
    <main className="main-background flex min-h-screen flex-col items-center justify-start p-2.5 bg-no-repeat bg-cover bg-center relative"
      //style={{ backgroundImage: "url('/memerunner2.png')" }}
    >
      <Link href="/make">
        <button className="button-make font-cyberpunk">
          M<br />A<br />K<br />E
        </button>
      </Link>

      <Link href="/take">
      <button className="button-take font-cyberpunk">
        T<br/>A<br/>K<br/>E
      </button>
      </Link>

      {/* Title and button container */}
      <div className="title-button-container w-full">
        {/* Invisible spacer with the same dimensions as the button */}
        <button className="button-connect-wallet neon-button px-6 py-3 font-cyberpunk invisible-spacer">
            Connect Wallet
        </button>

        <h1 className="neon-title text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Maker Factory</h1>
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
    
    <video id="background-video" autoPlay loop muted>
        <source src="/memerunner_background.mp4" type="video/mp4"></source>
    </video> 
    <img src="/watermark3.png" className="watermark" alt="Watermark" />
    
  </main>
  );}

