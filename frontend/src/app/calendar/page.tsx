"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Agbalumo, Raleway } from "next/font/google";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchUser } from "@/lib/data";
import frLocale from '@fullcalendar/core/locales/fr';
import { fetchUserEvents } from "@/lib/data"; // Importez la nouvelle fonction

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

function Calendar({ events }) {
  console.log(events);
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
      events={events.map(event => ({
        title: event.title,
        start: event.startDate,
        end: event.endDate,
        description: event.description,
        url: `/event/${event.id}`
      }))} // Transformez les événements pour FullCalendar
    />
  );
}

function renderEventContent(eventInfo) {
  return (
    <a className="flex flex-col bg-blue-500 text-white w-full h-full" href={eventInfo.event.url}>
      <b>{eventInfo.event.title}</b>
      <p className="whitespace-normal">{eventInfo.event.extendedProps.description}</p>
    </a>
  );
}

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser();
        setUser(userData);

        if (userData) {
          const userEvents = await fetchUserEvents();
          setEvents(userEvents); // Mettez à jour les événements
        }
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
        <Calendar events={events} /> // Passez les événements au composant Calendar
      ) : (
        <>
          <p>Connectez-vous pour accéder à votre calendrier</p>
        </>
      )}
    </div>
  );
}