// SPDX-License-Identifier: MIT
pragma solidity >=0.6.12 <0.9.0;

// Interface for interacting with Blast's yield functionalities
interface IBlast {
    function configureAutomaticYield() external;
    function claimYield(address contractAddress, address recipientOfYield, uint256 amount) external returns (uint256);
}

contract MemeRunnerBets {
    IBlast public constant BLAST = IBlast(0x4300000000000000000000000000000000000002); // Blast yield contract address on the L2 Testnet

    struct Bet {
        address bettor;
        string platform; // "gdelt" or "farcaster"
        string memecoin;
        uint256 metricCurrentValue;
        uint256 betCreationTime;
        uint256 betEndTime; // Timestamp for when the bet ends
        string outcomeDirection; // "Increase" or "Decrease"
        uint256 amount;
        bool outcome; // True if bet was successful, false otherwise
        bool settled; // True if bet has been settled
    }

    Bet[] public bets;
    mapping(address => uint256[]) public betsByAddress;
    uint256 public nextBetId = 0; // Tracks the next bet ID

    // Event to emit when a bet is placed
    event BetPlaced(uint256 indexed betId, address bettor, uint256 amount);

    // Event to emit when a bet is settled
    event BetSettled(uint256 indexed betId, address bettor, bool outcome, uint256 amount);

    constructor() {
        // Configure the contract to automatically earn yield on deposited ETH
        BLAST.configureAutomaticYield();
    }

    // Function to place a bet
    function placeBet(
        string memory _platform,
        string memory _memecoin,
        uint256 _metricCurrentValue,
        uint256 _betEndTime, // Changed to accept Unix timestamp
        string memory _outcomeDirection
    ) public payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
        // Validate that the bet end time is in the future
        require(_betEndTime > block.timestamp, "Bet end time must be in the future");

        uint256 betId = nextBetId++;
        bets.push(Bet({
            bettor: msg.sender,
            platform: _platform,
            memecoin: _memecoin,
            metricCurrentValue: _metricCurrentValue,
            betCreationTime: block.timestamp,
            betEndTime: _betEndTime,
            outcomeDirection: _outcomeDirection,
            amount: msg.value,
            outcome: false,
            settled: false
        }));

        betsByAddress[msg.sender].push(betId);
        
        emit BetPlaced(betId, msg.sender, msg.value);
    }

    // Function to settle a bet by betId
    function settleBet(uint256 _betId) public {
        Bet storage bet = bets[_betId];
        
        require(msg.sender == bet.bettor, "Only the bettor can settle the bet");
        require(!bet.settled, "Bet is already settled");
        require(block.timestamp >= bet.betEndTime, "Bet timeframe has not elapsed");

        bool outcome = determineOutcome(_betId);

        if (outcome) {
            uint256 yieldAmount = BLAST.claimYield(address(this), bet.bettor, bet.amount);
            payable(bet.bettor).transfer(bet.amount + yieldAmount);
        }
        
        bet.outcome = outcome;
        bet.settled = true;

        emit BetSettled(_betId, bet.bettor, outcome, bet.amount);
    }

    // Placeholder for outcome determination logic
    function determineOutcome(uint256 /*_betId*/) private pure returns (bool) {
        // This function would integrate with an oracle or other data source
        return true; // Simplified outcome determination
    }

    function getBet(uint256 _betId) public view returns (Bet memory) {
        require(_betId < bets.length, "Bet does not exist.");
        return bets[_betId];
    }

    function getBetsByAddress(address _bettor) public view returns (uint256[] memory) {
        return betsByAddress[_bettor];
    }
}
