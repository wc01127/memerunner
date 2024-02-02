'use client'
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ReactSelect from 'react-select';


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentChainId, setCurrentChainId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [originalCoins, setOriginalCoins] = useState([]); // Store the original list of coins
  const [coins, setCoins] = useState([]); // This will store the filtered and sorted list of coins
  const [selectedSortOption, setSelectedSortOption] = useState(null); // Initialize with null


  const sortOptions = [
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'fully_diluted_valuation', label: 'FDV' },
    { value: 'coingecko_watchers', label: 'CoinGecko Watchers' },
    { value: 'price_change_percentage_7d', label: '1 Week Change' },
    { value: 'price_change_percentage_14d', label: '2 Week Change' },
    { value: 'price_change_percentage_30d', label: '1 Month Change' },
    { value: 'price_change_percentage_60d', label: '2 Month Change' },
    { value: 'ath_change_percentage', label: 'ATH Change' },
  ];

  const formatNumber = (num) => {
    if (num === 0) return '0';
    const d = Math.ceil(Math.log10(num < 0 ? -num : num)); // Number of digits
    const power = 3 - d;
    const magnitude = Math.pow(10, power);
    const shifted = Math.round(num * magnitude);
    return (shifted / magnitude).toFixed(power >= 0 ? power : 0);
  };

  const formatValue = (value, option) => {
    if (option.includes('percentage')) {
      return `${formatNumber(value)}%`; // Format as percentage
    } else if (option === 'market_cap' || option === 'fully_diluted_valuation') {
      // Format as currency
      const units = ['Tr', 'B', 'M', 'Th'];
      const amounts = [1e12, 1e9, 1e6, 1e3];
      for (let i = 0; i < amounts.length; i++) {
        if (value >= amounts[i]) {
          return `$${formatNumber(value / amounts[i])} ${units[i]}`;
        }
      }
      return `$${formatNumber(value)}`; // Fallback for values less than 1000
    } else if (option === 'coingecko_watchers') {
      // Format large numbers with T, B, M, or Th
      const units = ['T', 'B', 'M', 'Th'];
      const amounts = [1e12, 1e9, 1e6, 1e3];
      for (let i = 0; i < amounts.length; i++) {
        if (value >= amounts[i]) {
          return `${formatNumber(value / amounts[i])} ${units[i]}`;
        }
      }
      return formatNumber(value); // Fallback for values less than 1000
    }
    return formatNumber(value); // Default formatting
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#FEFF05' : 'transparent',
      borderColor: '#FEFF05',
      color: state.isFocused ? '#000000' : '#FEFF05',
      fontFamily: 'Orbitron',
      opacity: 0.95, // Set the opacity to 95%
      ':hover': {
        ...provided[':hover'],
        opacity: 0.95, // Set the opacity to 95%
        backgroundColor: '#FEFF05',
        opacity: 0.95, // Set the opacity to 95%
        color: '#000000',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#FEFF05',
      fontFamily: 'Orbitron',
      opacity: 0.95, // Set the opacity to 95%
      color: '#000000',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected || state.isFocused ? '#FEFF05' : 'transparent',
      color: '#000000',
      opacity: 0.95, // Set the opacity to 95%
      fontFamily: 'Orbitron',
      ':hover': {
        backgroundColor: '#FEFF05',
        opacity: 0.95, // Set the opacity to 95%
        color: '#000000',
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontFamily: 'Orbitron',
      opacity: 0.95, // Set the opacity to 95%
      color: state.selectProps.menuIsOpen ? '#000000' : '#FEFF05',
    }),
    // ... other parts you want to style
  };

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
    // Fetch coins data from API
    fetch('https://meme-runner-server-1c735c2018ad.herokuapp.com/api/enriched_coingecko_data')
      .then(response => response.json())
      .then(data => {
        const cleanedData = data.map(coin => ({
          ...coin,
          // Replace NaN with null or any other cleanup you need
        }));
        setOriginalCoins(cleanedData); // Store the original coins data
        setSelectedSortOption(sortOptions[0]); // Set default sort option after fetching
      })
      .catch(error => console.error('Error fetching coin data:', error));
  }, []);

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    // Initialize the audio object here
    const newAudio = new Audio('/background_music.mp3');
    newAudio.loop = true;
    newAudio.volume = 0.1;
    setAudio(newAudio);
    // Play the audio
    newAudio.play().catch(error => console.error('Error playing audio:', error));
    // Cleanup function
    return () => newAudio.pause();
  }, []);
  
  useEffect(() => {
    // This effect runs when selectedSortOption changes or the originalCoins data changes
    if (selectedSortOption && originalCoins.length > 0) {
      const filteredAndSortedCoins = originalCoins
        .filter(coin => coin[selectedSortOption.value] !== 0) // Filter out coins with a value of 0 for the selected option
        .sort((a, b) => b[selectedSortOption.value] - a[selectedSortOption.value]); // Sort coins based on the selected option

      setCoins(filteredAndSortedCoins); // Update the coins state with the filtered and sorted list
    }
  }, [selectedSortOption, originalCoins]); // Depend on selectedSortOption and originalCoins

  const handleSortChange = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    // Logic to filter and sort coins based on the selected option
    const newSortedCoins = originalCoins
      .filter(coin => coin[selectedOption.value] !== 0)
      .sort((a, b) => b[selectedOption.value] - a[selectedOption.value]);
    setCoins(newSortedCoins);
  };

  return (
    <main className="main-background flex min-h-screen flex-col items-center justify-start p-2.5 bg-no-repeat bg-cover bg-center relative"
      //style={{ backgroundImage: "url('/memerunner2.png')" }}
    >
      <img src="/ufo1.gif" className="ufo ufo1" />
      <img src="/ufo2.gif" className="ufo ufo2" />
      <img src="/bomb.gif" className="bomb bomb1" />

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

      {/* Title and button container */}
      <div className="title-button-container w-full">
        {/* Invisible spacer with the same dimensions as the button */}
        <button className="button-connect-wallet neon-button px-6 py-3 font-cyberpunk invisible-spacer">
            Connect Wallet
        </button>

        <h1 className="neon-title neon-title-main text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Meme Runner</h1>
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

<div className="coins-section">
  <div className="selector-container">
    <ReactSelect
      options={sortOptions}
      styles={customStyles}
      value={selectedSortOption}
      onChange={handleSortChange}
      className="custom-react-select-container"
      classNamePrefix="custom-react-select"
    />
  </div>
    <div className="coins-container">

      {coins.map((coin, index) => (
          <div key={index} className="coin">
          <div className="coin-image-container">
            <img src={coin.image} alt={coin.symbol.toUpperCase()} className="coin-image" />
          </div>
          <div className="coin-name neon-title font-cyberpunk">{coin.symbol.toUpperCase()}</div>
          <div className="coin-value neon-title font-cyberpunk" style={{ fontSize: 'smaller' }}>
            {formatValue(coin[selectedSortOption.value], selectedSortOption.value)}
          </div>
        </div>
      ))}
    </div>
    </div>
    <div className="graveyard-button-container">
        <Link href="/graveyard" className="grave-button font-cyberpunk">Graveyard</Link>
      </div>
    <video id="background-video" autoPlay loop muted>
        <source src="/memerunner_background.mp4" type="video/mp4"></source>
    </video> 

    <div class="watermark">
      <img src="/watermark3.png" alt="Watermark" />
      <img src="/robot.gif" className="robot-gif" alt="Robot Animation" />
    </div>
    
  </main>
  );}

