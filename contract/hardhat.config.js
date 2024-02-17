require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    blastTestnet: {
      url: `https://sepolia.blast.io`,
      accounts: [`0x${process.env.PRIVATE_KEY}`], // Ensure your private key is stored securely, e.g., in an .env file
      chainId: 168587773, // Blast Sepolia Testnet chain ID
    }
  }
};
