export async function connectWallet() {
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
}