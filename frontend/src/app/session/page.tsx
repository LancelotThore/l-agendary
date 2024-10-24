'use client';

import { useEffect, useState } from 'react';


function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}

export default function HomePage() {
  const [sessionInfo, setSessionInfo] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        
        const res = await fetch('/api/session', {
          method: 'GET',
          credentials: 'include', // Assurez-vous que le cookie est envoyé avec la requête
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'text/plain',
          },
          
        });

        if (!res.ok) {
          throw new Error('Failed to fetch session info');
        }

        const data = await res.json();
        setSessionInfo(data);
      } catch (error) {
        console.error('Error fetching session info:', error);
        setSessionInfo(null); // Gérer l'erreur
      }
    };

    fetchSession();
  }, []);

  return (
    <div>
      <h1>Welcome Home</h1>
      {sessionInfo ? (
        <p>User Email: {sessionInfo.email || 'No email found'}</p>
      ) : (
        <p>Loading session...</p>
      )}
    </div>
  );
}
