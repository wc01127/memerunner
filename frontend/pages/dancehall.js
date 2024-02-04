// pages/dancehall.js
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import ReactSelect from 'react-select'; // Import React Select


export default function Dancehall() {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const initialSong = { value: '/NightclubAmnesia.mp3', label: 'Nightclub Amnesia - Ratatat' };
  const [currentSong, setCurrentSong] = useState(initialSong);
  const [audio, setAudio] = useState(null);
  const [hoveredGif, setHoveredGif] = useState('');

  useEffect(() => {
    // Initialize audio on component mount
    const newAudio = new Audio(initialSong.value);
    newAudio.loop = true;
    newAudio.volume = 0.1;
    setAudio(newAudio);

    // Cleanup on component unmount
    return () => {
      newAudio.pause();
    };
  }, []);

  useEffect(() => {
    // Ensure audio is not null and update the song when the selection changes
    if (audio) {
      const changeSong = async () => {
        audio.pause();
        audio.src = currentSong.value;
        try {
          await audio.play();
        } catch (error) {
          console.error('Error playing audio:', error);
        }
      };

      changeSong();
    }
  }, [currentSong, audio]);

  const songOptions = [
    { value: '/NightclubAmnesia.mp3', label: 'Nightclub Amnesia - Ratatat' },
    { value: '/One.mp3', label: 'One - Ratatat' },
    { value: '/Shempi.mp3', label: 'Shempi - Ratatat' },
  ];

  // Rest of your component...
  const gifs = [
    { src: "/penguindance.gif", left: '2%', bottom: '12%', width: 165, height: 165 },
    { src: "/chaddance.gif", left: '26%', bottom: '52%', width: 150, height: 150 },
    { src: "/pepedance.gif", left: '39%', bottom: '0', width: 200, height: 200 },
    { src: "/moyai-dance.gif", left: '43%', bottom: '94%', width: 105, height: 100 },
    { src: "/wojakdance.gif", left: '62%', bottom: '88%', width: 135, height: 125 },
    { src: "/dogedance.gif", left: '83%', bottom: '32%', width: 100, height: 100, special: 'dogedance'  },
    { src: "/trolldance.gif", left: '20%', bottom: '90%', width: 90, height: 110 },
    { src: "/gorillachestbeat.gif", left: '55%', bottom: '50%', width: 175, height: 175 },
  ]

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

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: 'transparent',
      borderColor: '#FEFF05',
      color: state.isFocused ? '#000000' : '#FEFF05',
      fontFamily: 'Orbitron',
      opacity: 0.9,
      boxShadow: state.isFocused ? '0 0 0 1px #FEFF05' : 'none', // Optional: Adds a glow effect on focus
      ':hover': {
        borderColor: '#FEFF05',
        color: '#000000',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#FEFF05',
      color: '#000000',
      opacity: 0.9,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'transparent' : state.isFocused ? '#FEFF05' : '#FEFF05',
      color: state.isSelected ? '#FEFF05' : state.isFocused ? '#000000' : '#000000',
      ':active': {
        backgroundColor: '#FEFF05',
        color: '#000000',
      },
      ':hover': {
        ...provided[':hover'],
        backgroundColor: '#FEFF05',
        color: '#000000', // Ensures text color remains black on hover
      },
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#FEFF05',
    }),
    // Add other style adjustments here as needed
  };
  
  const calculateSpotlightSize = (bottom) => {
    // Adjust the size of the spotlight based on the GIF's position to simulate depth
    const bottomPercentage = parseInt(bottom, 10);
    const sizeFactor = 1 - (bottomPercentage / 100 * 0.5); // Example scaling factor, adjust as needed
    return sizeFactor;
  };

  return (
    <div className="dancehall">
      <Head>
        <title>Speakeasy</title>
      </Head>
      <div className="title-button-container w-full">
        <button className="button-connect-wallet neon-button px-6 py-3 font-cyberpunk invisible-spacer">
          Connect Wallet
        </button>
        <h1 className="neon-title neon-title-main text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Speakeasy</h1>
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

      <div className="home-button-container">

<Link href="/" className="home-button font-cyberpunk">H O M E</Link>

      </div>

      <div className="watermark">
        <img src="/watermark4.png" alt="Watermark" />
        <img src="/robot.gif" className="robot-gif" alt="Robot Animation" />
      </div>

      <div className="watermark2">
          <img src="/ratatat_mark2.png" alt="Watermark2" />
          <Link href="/dancehall">
            <img src="/ape.gif" className="ape-gif" alt="Ape Animation" />
          </Link>
        </div>

      <video id="background-video" autoPlay loop muted>
        <source src="/speakeasy_bachground.mp4" type="video/mp4"></source>
    </video> 

      <div className="song-selector-container" style={{ position: 'absolute', left: '10%', top: '40%' }}>
        <ReactSelect
          options={songOptions}
          value={currentSong}
          onChange={(selectedOption) => setCurrentSong(selectedOption)}
          styles={customSelectStyles}
        />
      </div>

      <div className="leftImage">
        <Image src="/left.png" alt="Left" layout="fill" objectFit="contain" />
      </div>
      <div className="rightImage">
        <Image src="/right.png" alt="Right" layout="fill" objectFit="contain" />
      </div>
      <div className="elonGif">
        <Image src="/elon.gif" alt="Elon" layout="fill" objectFit="contain" />
      </div>
      <div className="filledZoomGif">
        <Image src="/filled_zoom3.gif" alt="Filled Zoom" layout="fill" objectFit="contain" />
      </div>
      <div className="pepeImage">
        <Image src="/pepe.png" alt="Pepe" layout="fill" objectFit="contain" />
      </div>
      <div className="eggdogImage">
        <Image src="/eggdog.png" alt="Eggdog" layout="fill" objectFit="contain" />
      </div>


      {/* Gifs container */}
      <div className="gifs-container">
      {gifs.map((gif, index) => (
    <div
      key={index}
      className={`gif ${gif.special ? 'dogedance' : ''}`}
      onMouseEnter={() => setHoveredGif(gif.src)}
      onMouseLeave={() => setHoveredGif('')}
      style={{
        left: gif.left,
        bottom: gif.bottom,
        zIndex: 100 - parseInt(gif.bottom, 10),
        width: `calc(${gif.width}px * var(--scale-factor))`,
        height: `calc(${gif.height}px * var(--scale-factor))`,
      }}
    >
      <Image src={gif.src} layout="responsive" width={gif.width} height={gif.height} alt="Dance GIF" />
      {hoveredGif === gif.src && (
        <div
          className={`spotlight ${gif.special ? 'special-spotlight' : ''}`}
          style={{
            // Additional styles if needed for specific adjustments
          }}
        ></div>
      )}
    </div>
))}
      </div>    </div>
  );

}
