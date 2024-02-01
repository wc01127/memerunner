// take.js
'use client';
import React from 'react';
import Link from 'next/link';

export default function Take() {
  // Page-specific content goes here
  return (
    <main>
      <h1>Taker Market</h1>
      {/* Add more content as needed */}
      <Link href="/">
        <a>Go back to Home</a>
      </Link>
    </main>
  );
}
