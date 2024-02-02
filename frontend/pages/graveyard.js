import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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

  return (
    <main className="main-background flex min-h-screen flex-col items-center justify-center p-2.5 bg-no-repeat bg-cover bg-center relative"
    >
    <video id="background-video" autoPlay loop muted>
        <source src="/graveyard_background.mp4" type="video/mp4"></source>
    </video> 

      <div className="title-button-container w-full">
      <button className="button-connect-wallet neon-button px-6 py-3 font-cyberpunk invisible-spacer">
            Connect Wallet
        </button>
        <h1 className="neon-title neon-title-main text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Graveyard</h1>
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

      <div className="graveyard-button-container">
        <Link href="/" className="grave-button font-cyberpunk">BACK</Link>
      </div>

      <div className="watermark">
        <img src="/watermark3.png" alt="Watermark" />
        <img src="/robot.gif" className="robot-gif" alt="Robot Animation" />
      </div>
    </main>
  );
}