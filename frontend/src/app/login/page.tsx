"use client";

import { useState } from 'react';
import { Raleway } from 'next/font/google';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ralewaySemBold = Raleway({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-raleway',
});

const ralewayMedium = Raleway({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-raleway',
});

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const response = await fetch('https://localhost:443/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', 
    });

    if (response.ok) {
      // const data = await response.json();
      // Sauvegarder le token JWT (dans localStorage, par exemple)
      // localStorage.setItem('token', data.token);
      // Rediriger vers la page d'accueil ou une autre page
      // router.push('/');
    } else {
      const errorData = await response.json();
      setError(errorData.errors || 'Erreur de connexion'); // Affiche une erreur si la connexion échoue
    }
  };

  return (
    <div className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}>
      <Link href="/">
        <img className='w-24 md:w-40' src="./logo2.svg" alt="Logo Icon" />
      </Link>

      <form onSubmit={handleSubmit} className='flex justify-center items-center flex-col shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:p-8'>
        <h2 className={`${ralewaySemBold.className} text-base md:text-3xl md:text-center`}>Se connecter</h2>
        
        {error && <p className='text-red-500 text-sm'>{error}</p>} {/* Affichage des erreurs */}

        <div className='w-full lg:w-96'>
          <div className='mt-3 flex flex-col gap-1'>
            <label className='text-xs md:text-base' htmlFor="email">Email</label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base'
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Mise à jour de l'état
            />
          </div>

          <div className='mt-3 flex flex-col gap-1'>
            <label className='text-xs md:text-base' htmlFor="password">Mot de passe</label>
            <Input
              id="password"
              placeholder="Mot de passe"
              type="password"
              className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Mise à jour de l'état
            />
            <a href="/recover/account" className='text-cardDate text-sm text-right hover:underline hover:underline-offset-2 transition-transform'>Mot de passe oublié</a>
          </div>
          
          <div className='flex justify-center flex-col'>
            <Button type="submit" size="sm" className="mt-4 mx-auto">Se connecter</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
