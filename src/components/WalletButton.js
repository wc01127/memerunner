// WalletButton.js
import React from 'react';

const WalletButton = () => {
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '168587773' }], // Blast Testnet Chain ID
        });
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  return (
    <button
      onClick={connectWallet}
      className="absolute top-5 right-5 px-6 py-3 bg-cyberpunkYellow text-cyberpunkBlack font-bold font-cyberpunk rounded opacity-75 hover:opacity-100 transition duration-300"
    >
      Connect Wallet
    </button>
  );
};

export default WalletButton;

