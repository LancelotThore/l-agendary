"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Agbalumo, Raleway } from "next/font/google";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchUser } from "@/app/api/data";
import frLocale from '@fullcalendar/core/locales/fr';

const agbalumo = Agbalumo({
  subsets: ["latin"],
  variable: "--font-test",
  weight: "400",
});
const raleway = Raleway({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-raleway",
});

function Calendar() {
  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      locale='fr'
      locales={[frLocale]} // Ajoutez cette ligne pour inclure la localisation française
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
      }}
      eventContent={renderEventContent}
      events={[
        { title: 'événement 1', start: '2024-12-02T14:15:00', end: '2024-11-03T18:52:01' },
        { title: 'événement 2', start: '2024-11-06T14:00:00', end: '2024-11-06T15:35:00' }
      ]}
    />
  );
}

function renderEventContent() {
  return (
    <a className="flex flex-col bg-blue-500 text-white w-full h-full" href="/event/29">
        <b>titre</b>
        <p className="whitespace-normal">description...</p>
    </a>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);
      } catch (err) {
        setError("Erreur lors de la récupération de l'utilisateur :", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {user ? (
        <Calendar />
      ) : (
        <>
          <p>Connectez-vous pour accéder à votre calendrier</p>
        </>
      )}
    </div>
  );
}