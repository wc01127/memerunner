const hre = require("hardhat");

async function main() {
  // Correctly using deployContract method as per the new standards
  const memeRunnerBets = await hre.ethers.deployContract("MemeRunnerBets", [], {
    // Assuming your contract doesn't require initial ETH to be sent
    // If it does, include the value field here
  });

  // Using waitForDeployment if that's the updated method to wait for the deployment to complete
  await memeRunnerBets.waitForDeployment();

  console.log(`MemeRunnerBets deployed to: ${memeRunnerBets.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
