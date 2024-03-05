import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import ReactSelect from 'react-select';
import Image from 'next/image'; // Make sure to import Image from 'next/image'


export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [currentChainId, setCurrentChainId] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [originalCoins, setOriginalCoins] = useState([]); // Store the original list of coins
  const [coins, setCoins] = useState([]); // This will store the filtered and sorted list of coins
  const [selectedSortOption, setSelectedSortOption] = useState(null); // Initialize with null
  const [isDiamondHovered, setIsDiamondHovered] = useState(false);
  const [isFrownHovered, setIsFrownHovered] = useState(false);
  const [selectedGif, setSelectedGif] = useState('cube'); // 'cube' or 'brain'
  const [selectedDataSource, setSelectedDataSource] = useState('gdelt'); // 'gdelt' or 'farcaster'


  const cubeOptions = [
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'fully_diluted_valuation', label: 'FDV' },
    { value: 'price_change_percentage_24h', label: '1 Day Change' },
    { value: 'price_change_percentage_7d', label: '1 Week Change' },
    { value: 'price_change_percentage_14d', label: '2 Week Change' },
    { value: 'price_change_percentage_30d', label: '1 Month Change' },
    { value: 'price_change_percentage_60d', label: '2 Month Change' },
    { value: 'ath_change_percentage', label: 'ATH Change' },
  ];
  
  const brainOptions = [
    { value: 'gdelt_1d', label: '1 Day Media Share' },
    { value: 'gdelt_7d', label: '1 Week Media Share' },
    { value: 'gdelt_14d', label: '2 Week Media Share' },
    { value: 'gdelt_30d', label: '1 Month Media Share' },
    { value: 'gdelt_60d', label: '2 Month Media Share' },
    { value: 'farcaster_1d', label: '1 Day Farcaster Share' },
    { value: 'farcaster_7d', label: '1 Week Farcaster Share' },
    { value: 'farcaster_14d', label: '2 Week Farcaster Share' },
    { value: 'farcaster_30d', label: '1 Month Farcaster Share' },
    { value: 'coingecko_watchers', label: 'CoinGecko Watchers' },
  ];
  
  // Use state for dynamic sort options
  const [sortOptions, setSortOptions] = useState(cubeOptions);
  
  useEffect(() => {
    if (selectedGif === 'cube') {
      setSortOptions(cubeOptions);
      setSelectedSortOption(cubeOptions[0]);
    } else {
      const brainOptions = selectedDataSource === 'gdelt' ? [
        { value: 'gdelt_1d', label: '1 Day Share' },
        { value: 'gdelt_7d', label: '1 Week Share' },
        { value: 'gdelt_14d', label: '2 Week Share' },
        { value: 'gdelt_30d', label: '1 Month Share' },
      ] : [
        { value: 'farcaster_1d', label: '1 Day Share' },
        { value: 'farcaster_7d', label: '1 Week Share' },
        { value: 'farcaster_14d', label: '2 Week Share' },
        { value: 'farcaster_30d', label: '1 Month Share' },
      ];
      setSortOptions(brainOptions);
      setSelectedSortOption(brainOptions[0]);
    }
  }, [selectedGif, selectedDataSource]);
  
  
  const handleGifSelection = (gifName) => {
    setSelectedGif(gifName);
  };
/*
  const sortOptions = [
    { value: 'market_cap', label: 'Market Cap' },
    { value: 'fully_diluted_valuation', label: 'FDV' },
    { value: 'price_change_percentage_24h', label: '1 Day Change' },
    { value: 'price_change_percentage_7d', label: '1 Week Change' },
    { value: 'price_change_percentage_14d', label: '2 Week Change' },
    { value: 'price_change_percentage_30d', label: '1 Month Change' },
    { value: 'price_change_percentage_60d', label: '2 Month Change' },
    { value: 'ath_change_percentage', label: 'ATH Change' },
    { value: 'coingecko_watchers', label: 'CoinGecko Watchers' },
  ];
*/
  const formatNumber = (num) => {
    if (num === 0) return '0';
    const d = Math.ceil(Math.log10(num < 0 ? -num : num)); // Number of digits
    const power = 3 - d;
    const magnitude = Math.pow(10, power);
    const shifted = Math.round(num * magnitude);
    return (shifted / magnitude).toFixed(power >= 0 ? power : 0);
  };

  const formatValue = (value, option) => {
    if (option.endsWith('_1d') || option.endsWith('_7d') || option.endsWith('_14d') || option.endsWith('_30d')) {
      return `${value.toFixed(2)}%`; // Format as percentage
    }
    if (option.startsWith('gdelt')) {
      return `${value.toFixed(2)}%`; // Format GDELT values as percentages
    }
    if (option.startsWith('farcaster')) {
      return `${value.toFixed(2)}%`; // Format GDELT values as percentages
    }
    if (option.includes('percentage')) {
      return `${formatNumber(value)}%`; // Format as percentage
    } else if (option === 'market_cap' || option === 'fully_diluted_valuation') {
      // Format as currency
      const units = ['Tr', 'B', 'M', 'K'];
      const amounts = [1e12, 1e9, 1e6, 1e3];
      for (let i = 0; i < amounts.length; i++) {
        if (value >= amounts[i]) {
          return `$${formatNumber(value / amounts[i])} ${units[i]}`;
        }
      }
      return `$${formatNumber(value)}`; // Fallback for values less than 1000
    } else if (option === 'coingecko_watchers') {
      // Format large numbers with T, B, M, or K
      const units = ['T', 'B', 'M', 'K'];
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
      opacity: 0.9, // Set the opacity to 95%
      ':hover': {
        ...provided[':hover'],
        opacity: 0.9, // Set the opacity to 95%
        backgroundColor: '#FEFF05',
        opacity: 0.9, // Set the opacity to 95%
        color: '#000000',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#FEFF05',
      fontFamily: 'Orbitron',
      opacity: 0.9, // Set the opacity to 95%
      color: '#000000',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected || state.isFocused ? '#FEFF05' : 'transparent',
      color: '#000000',
      opacity: 0.9, // Set the opacity to 95%
      fontFamily: 'Orbitron',
      ':hover': {
        backgroundColor: '#FEFF05',
        opacity: 0.9, // Set the opacity to 95%
        color: '#000000',
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      fontFamily: 'Orbitron',
      opacity: 0.9, // Set the opacity to 95%
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
    fetch('https://meme-runner-0fde5367bf4b.herokuapp.com/api/enriched_coingecko_data')
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
    const newAudio = new Audio('/Nostrand.mp3');
    newAudio.loop = true;
    newAudio.volume = 0.1;
    setAudio(newAudio);
    // Play the audio
    newAudio.play().catch(error => console.error('Error playing audio:', error));
    // Cleanup function
    return () => newAudio.pause();
  }, []);
  useEffect(() => {
    if (selectedSortOption && originalCoins.length > 0) {
      const filteredAndSortedCoins = originalCoins
        .filter(coin => coin[selectedSortOption.value] !== 0)
        .sort((a, b) => b[selectedSortOption.value] - a[selectedSortOption.value]);
  
      setCoins(filteredAndSortedCoins);
    }
  }, [selectedSortOption, originalCoins]);
  
  const handleSortChange = (selectedOption) => {
    setSelectedSortOption(selectedOption);
    // Logic to filter and sort coins based on the selected option
    const newSortedCoins = originalCoins
      .filter(coin => coin[selectedOption.value] !== 0)
      .sort((a, b) => b[selectedOption.value] - a[selectedOption.value]);
    setCoins(newSortedCoins);
  };

  const [firstCoinPosition, setFirstCoinPosition] = useState({ top: 0, left: 0 });
  const [lastCoinPosition, setLastCoinPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (coins.length > 0) {
      const firstCoinElement = document.querySelector('.coin:first-child');
      const lastCoinElement = document.querySelector('.coin:last-child');
      if (firstCoinElement && lastCoinElement) {
        const firstCoinRect = firstCoinElement.getBoundingClientRect();
        const lastCoinRect = lastCoinElement.getBoundingClientRect();
        setFirstCoinPosition({ top: firstCoinRect.top, left: firstCoinRect.left +60}); // Adjust 50 as needed
        setLastCoinPosition({ top: lastCoinRect.top, left: lastCoinRect.right - 40}); // Adjust 10 as needed
      }
    }
  }, [coins]); // Depend on coins
  
  return (
    <main className="main-background flex min-h-screen flex-col items-center justify-start p-2.5 bg-no-repeat bg-cover bg-center relative">
      <Head>
        <title>City Center - Meme Runner</title>
      </Head>

      <img src="/ufo1.gif" className="ufo ufo1" />
      <img src="/ufo2.gif" className="ufo ufo2" />
      <img src="/bomb.gif" className="bomb bomb1" />

      {/* <Link href="/make">
        <button className="button-make font-cyberpunk">
          M<br/>A<br/>K<br/>E
        </button>
      </Link> */}

      {/* <Link href="/take">
      <button className="button-take font-cyberpunk">
        T<br/>A<br/>K<br/>E
      </button>
      </Link> */}

      

      {/* Title and button container */}
      <div className="title-button-container w-full">
        {/* Invisible spacer with the same dimensions as the button */}
        {/* <button className="button-connect-wallet neon-button px-3 py-3 font-cyberpunk invisible-spacer">
            Connect Wallet
        </button> */}

        <h1 className="title-background neon-title neon-title-main text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Meme Runner</h1>
        {/* <div>
        <button
            onClick={isConnected ? disconnectWallet : connectWallet}
            onMouseOver={e => isConnected ? e.target.textContent = 'Disconnect' : null}
            onMouseOut={e => e.target.textContent = isConnected ? 'Connected' : 'Connect Wallet'}
            className="button-connect-wallet neon-button px-3 py-3 font-cyberpunk"
        >
            {isConnected ? 'Connected' : 'Connect Wallet'}
        </button>
        {isConnected && walletAddress && (
                <div className="wallet-address neon-title font-cyberpunk text-cyberpunkYellow">
                    {walletAddress}
                </div>
        )}
        </div> */}
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
  <div className="gif-button-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
  <button
    onClick={() => handleGifSelection('cube')}
    style={// In your button style
      {
        padding: '10px 20px', // Adjust the padding as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: selectedGif === 'cube' ? '3px solid #FEFF05' : '1px solid #FEFF05',
        borderRadius: '10px',
        boxShadow: selectedGif === 'cube' ? '0 0 8px 2px #FEFF05' : 'none',
        transition: 'box-shadow 0.3s ease-in-out',
        cursor: 'pointer',
      }
      }
  >
    <img src="/cube3.gif" alt="Cube" className="gifButton" style={{ 
      width: '50px', 
      height: '50px', 
      opacity:0.85, 
      filter: selectedGif === 'cube' ? 'brightness(110%) contrast(120%)' : 'brightness(100%) contrast(100%)',
      zIndex: 1000, // High z-index value
      position: 'relative' }} />
  </button>
  <button
    onClick={() => handleGifSelection('brain')}
    style={// In your button style
      {
        padding: '10px 20px', // Adjust the padding as needed
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: selectedGif === 'brain' ? '3px solid #FEFF05' : '1px solid #FEFF05',
        borderRadius: '10px',
        boxShadow: selectedGif === 'brain' ? '0 0 8px 2px #FEFF05' : 'none',
        transition: 'box-shadow 0.3s ease-in-out',
        cursor: 'pointer',
      }
      }
  >
    <img src="/brain4.gif" alt="Brain" className="gifButton" style={{ 
      width: '50px', 
      height: '50px', 
      opacity:0.85, 
      filter: selectedGif === 'brain' ? 'brightness(120%) contrast(120%)' : 'brightness(100%) contrast(100%)',
      zIndex: 1000, // High z-index value
    position: 'relative'
}} />
  </button>
</div>

  <div className="coins-section">
    {selectedSortOption && ['price_change_percentage_24h', 'price_change_percentage_7d', 'price_change_percentage_14d', 'price_change_percentage_30d', 'price_change_percentage_60d'].includes(selectedSortOption.value) && (
      <>
        <img
          src="/diamond.gif"
          alt="Diamond"
          className={`gif-hover-glow ${isDiamondHovered ? 'apply-glow-effect-class' : ''}`}
          style={{
            position: 'absolute',
            top: firstCoinPosition.top + 'px',
            left: firstCoinPosition.left + 'px',
            zIndex: 2,
            width: '50px',
            height: '50px',
            opacity: 0.87 
          }}
          onMouseEnter={() => setIsDiamondHovered(true)}
          onMouseLeave={() => setIsDiamondHovered(false)}
        />
        <img
          src="/frown.gif"
          alt="Frown"
          className={`gif-hover-glow ${isFrownHovered ? 'apply-glow-effect-class' : ''}`}
          style={{
            position: 'absolute',
            top: lastCoinPosition.top + 'px',
            left: lastCoinPosition.left + 'px',
            zIndex: 2,
            width: '50px',
            height: '50px',
            opacity: 0.85 
          }}
          onMouseEnter={() => setIsFrownHovered(true)}
          onMouseLeave={() => setIsFrownHovered(false)}
        />
      </>
    )}
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

</div>

<div className="selector-container" style={{ display: 'flex', alignItems: 'center' }}>
      
      <ReactSelect
        options={sortOptions}
        styles={customStyles}
        value={selectedSortOption}
        onChange={handleSortChange}
        className="custom-react-select-container"
        classNamePrefix="custom-react-select"
      />
{selectedGif === 'brain' && (
  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
    <button onClick={() => setSelectedDataSource('gdelt')} style={{
      border: selectedDataSource === 'gdelt' ? '3px solid #FEFF05' : '1px solid #FEFF05',
      borderRadius: '10px',
      //padding: '10px 20px', // Increased padding for more width and a rectangular shape
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly darker to stand out from the selector
      cursor: 'pointer',
      boxShadow: selectedDataSource === 'gdelt' ? '0 0 10px 3px #FEFF05' : 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90px'
      //margin: '0 10px', // Added margin for separation from the selector and between buttons
    }}>
      <img src="/gdelt.png" alt="GDELT" style={{ width: '180px', height: '25px' }} /> {/* Adjusted dimensions */}
    </button>
    <button onClick={() => setSelectedDataSource('farcaster')} style={{
      border: selectedDataSource === 'farcaster' ? '3px solid #FEFF05' : '1px solid #FEFF05',
      borderRadius: '10px',
      //padding: '10px 8px', // Increased padding for more width and a rectangular shape
      backgroundColor: 'rgba(0, 0, 0, 0.7)', // Slightly darker to stand out from the selector
      cursor: 'pointer',
      boxShadow: selectedDataSource === 'farcaster' ? '0 0 10px 3px #FEFF05' : 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90px',
      margin: '0 10px', // Added margin for separation from the selector and between buttons
    }}>
      <img src="/farcaster.png" alt="Farcaster" style={{ width: '180px', height: '25px' }} /> {/* Adjusted dimensions */}
    </button>
  </div>
)}
    </div>


    <div className="coins-container" style={{ position: 'relative' }}>
      {coins.map((coin, index) => (
        <div key={index} className="coin">
          <div className="coin-image-container">
            <img src={coin.image} alt={coin.symbol.toUpperCase()} className="coin-image" />
          </div>
          <div className="coin-name neon-title font-cyberpunk">{coin.symbol.toUpperCase()}</div>
          <div className="coin-value neon-value font-cyberpunk">
            {formatValue(coin[selectedSortOption.value], selectedSortOption.value)}
          </div>
        </div>
      ))}
    </div>
  </div>

  <div className="track-button-container">
        <Link href="/track" className="grave-button font-cyberpunk">T R A C K</Link>
      </div>
    
    <div className="graveyard-button-container">
        <Link href="/graveyard" className="grave-button font-cyberpunk">G R A V E S</Link>
      </div>
    <video id="background-video" autoPlay loop muted>
        <source src="/memerunner_background.mp4" type="video/mp4"></source>
    </video> 

    <div class="watermark">
      <img src="/watermark5.png" alt="Watermark" />
      <img src="/robot.gif" className="robot-gif" alt="Robot Animation" />
    </div>

    <div className="watermark2">
          <img src="/ratatat_mark2.png" alt="Watermark2" />
          <Link href="/dancehall">
            <img src="/ape.gif" className="ape-gif" alt="Ape Animation" />
          </Link>
        </div>
    
  </main>);}

