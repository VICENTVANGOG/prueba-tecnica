"use client"; // Asegúrate de tener esta línea en la parte superior

import React from 'react';
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <>
      <h1>Home Page</h1>
      <div>
        <Link href="/login">Go to Login</Link> 

      </div>
      <div>
        <Link href="/registro">Go to register</Link> 
        
      </div>
    </>
  );
}

export default HomePage;
