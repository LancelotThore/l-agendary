'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchUser } from "@/app/api/data"; // Assurez-vous d'avoir une fonction pour récupérer les informations de l'utilisateur

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (err) {
        setError('Erreur lors de la récupération des informations utilisateur');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (

    <div className="flex w-full p-1.5 bg-secondary rounded-lg gap-2 md:gap-6 md:px-8 md:py-5 lg:h-full shadow-md">
      <div className="aspect-square w-32 md:w-auto lg:order-2">
        <img
          className="rounded-lg object-cover h-full w-full"
          src="img.png"
          alt={`Image de profil de ${user.email}`}
        />
      </div>
      <div className="flex flex-col overflow-hidden h-fit lg:h-full w-full">
        <h4 className="hidden md:block ml-3 mt-2.5 mb-8 font-bold text-xl md:text-2xl">
          Mon Profile
        </h4>
        <div className="flex gap-11 mb-5 font-semibold">
          <p>{user.firstname} {user.lastname}</p>
          <p className="mr-6">{user.firstname} ans</p>
        </div>
        <p className="hidden md:block font-semibold">Biographie :</p>
        <p className="line-clamp-3 md:line-clamp-none text-sm">
          {user.firstname}
        </p>
      </div>
    </div>

  );
}