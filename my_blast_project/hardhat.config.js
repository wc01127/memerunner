require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    blastTestnet: {
      url: `https://sepolia.blast.io`,
      accounts: [`0x6905114199127a2b6643bb3f82ca12e4dc118e67fcc08136ec88b8f142e62f9b`], // Ensure your private key is stored securely, e.g., in an .env file
      chainId: 168587773, // Blast Sepolia Testnet chain ID
    }
  }
};
