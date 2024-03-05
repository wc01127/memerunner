import { ethers } from 'ethers';
import MemeRunnerBetsArtifact from '../../public/MemeRunnerBets.json';

const MemeRunnerBetsABI = MemeRunnerBetsArtifact.abi;
const contractAddress = "0xd8ce647398f783AdcD2cC96bC3EA9650C929c506";
const rpcUrl = "https://sepolia.blast.io";

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, MemeRunnerBetsABI, signer);
console.log(MemeRunnerBetsABI); // Add this line to debug the ABI's structure

export const getSigner = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    return provider.getSigner();
  } else {
    console.error("MetaMask is not available");
    return null;
  }
};

export const placeBet = async (platform, memecoin, metricCurrentValue, betEndTime, outcomeDirection, amount) => {
  try {
    const tx = await contract.placeBet(platform, memecoin, metricCurrentValue, betEndTime, outcomeDirection, { value: ethers.utils.parseEther(amount.toString()) });
    await tx.wait();
    console.log("Bet placed successfully:", tx);
  } catch (error) {
    console.error("Error placing bet:", error);
  }
};

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