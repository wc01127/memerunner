import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Track() {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    fetch('https://meme-runner-0fde5367bf4b.herokuapp.com/api/enriched_coingecko_data')
      .then((response) => response.json())
      .then((data) => {
        const topCoins = data.sort((a, b) => b.market_cap - a.market_cap).slice(0, 10);
        const maxCap = topCoins[0].market_cap;
        const minCap = topCoins[topCoins.length - 1].market_cap;
        const normalizedCoins = topCoins.map(coin => ({
          ...coin,
          normalizedCap: (coin.market_cap - minCap) / (maxCap - minCap)
        }));
        setCoins(normalizedCoins);
      })
      .catch((error) => console.error('Error fetching coin data:', error));
  }, []);

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
    <div
      key={coin.id}
      className="lane"
      style={{
        left: `${10 + index * (80 / coins.length)}%`, // This already aligns with the dividers
        top: `${-60 + (1 - coin.normalizedCap) * 140}%`, // Adjust if necessary
      }}
    >
      <Image src={coin.image} alt={coin.name} width={50} height={50} unoptimized={true} />
      <p><small>{coin.symbol.toUpperCase()}</small></p>
    </div>
  ))}
</div>


        <div className="graveyard-button-container">
        <Link href="/" className="grave-button font-cyberpunk">H O M E</Link>
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