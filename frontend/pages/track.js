import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Track() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('https://meme-runner-0fde5367bf4b.herokuapp.com/api/enriched_coingecko_data')
      .then(response => response.json())
      .then(data => {
        // Sort by market cap in descending order
        let sortedCoins = data.filter(coin => coin.market_cap > 100000000)
                              .sort((a, b) => b.market_cap - a.market_cap);
        
        // Calculate the midpoint index
        const midpoint = Math.floor(sortedCoins.length / 2);
  
        // Split the array into two halves
        const leftHalf = sortedCoins.slice(0, midpoint).reverse(); // lower market cap on the left
        const rightHalf = sortedCoins.slice(midpoint, sortedCoins.length); // higher market cap on the right
  
        // Merge two halves so the coin with the highest market cap is in the center
        const orderedCoins = [...leftHalf, ...rightHalf];
        const isTotalCoinsOdd = orderedCoins.length % 2 !== 0;

  
        // Calculate positions
        orderedCoins.forEach((coin, index) => {

          const horizontalCenter = isTotalCoinsOdd ? 48.5 : 50;
          const offset = (index - midpoint) * (100 / sortedCoins.length);
          const horizontalPosition = horizontalCenter + offset;
  
          const logCap = Math.log(coin.market_cap);
          const minLogCap = Math.log(sortedCoins[sortedCoins.length - 1].market_cap);
          const maxLogCap = Math.log(sortedCoins[0].market_cap);
          const normalizedLogCap = (logCap - minLogCap) / (maxLogCap - minLogCap);
          const verticalPosition = normalizedLogCap * 87; // Adjust as needed
  
          coin.horizontalPosition = horizontalPosition;
          coin.verticalPosition = verticalPosition;
        });
  
        setCoins(orderedCoins);
      })
      .catch(error => console.error('Error fetching coin data:', error));
  }, []);
  
  

  // Helper function to format market cap
  const formatMarketCap = (marketCap) => {
    if (marketCap >= 1e9) {
      return `${(marketCap / 1e9).toFixed(marketCap < 10e9 ? 1 : 0)} B`;
    } else if (marketCap >= 1e6) {
      return `${Math.round(marketCap / 1e6)} M`;
    } else {
      return `${Math.round(marketCap / 1e3)} K`;
    }
  };

  const coinSize = coins.length > 10 ? Math.max(50 - (coins.length - 10) * 3, 20) : 50;


  return (
    <div className="trackContainer">
      <Head>
        <title>Racetrack</title>
      </Head>
      <video id="background-video" autoPlay loop muted>
        <source src="/unknown_background.mp4" type="video/mp4"></source>
</video>    
      <main className="trackMain">
      <h1 className="title-background neon-title neon-title-main text-6xl font-bold font-cyberpunk opacity-0.95 text-cyberpunkYellow">Racetrack</h1>
      <div className="racetrack">
      {coins.map((coin, index) => (
  <div key={coin.id} className="lane" style={{
    left: `${coin.horizontalPosition}%`,
    bottom: `${coin.verticalPosition}%`,
  }}>
    {/* Conditionally render arrow image based on price_change_24h */}
    {coin.price_change_24h !== 0 && (
      <div className="arrow-container" style={{
        opacity: 1 - (1 / (2 + 1000000*Math.abs(coin.price_change_24h))), // Adjust transparency based on change magnitude
      }}>
        <Image
          src={coin.price_change_24h > 0 ? '/greenarrow.png' : '/redarrow.png'}
          alt="Price Change Arrow"
          width={24} // Set the size as needed
          height={24}
          unoptimized={true}
        />
      </div>
    )}
                  <div className="vertical-line"></div>

    {/* Existing coin image */}
    <div className="coinImage">
      <Image src={coin.image} alt={coin.name} width={50} height={50} style={{ borderRadius: '50%' }} unoptimized={true} />
    </div>
    <p>{formatMarketCap(coin.market_cap)}</p>
  </div>
))}





        </div>


        <div className="track-button-container">
        <Link href="/" className="grave-button font-cyberpunk">H O M E</Link>
      </div>

      <div className="graveyard-button-container">
        <Link href="/graveyard" className="grave-button font-cyberpunk">G R A V E</Link>
      </div>
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
      </main>
    </div>
  );
}

