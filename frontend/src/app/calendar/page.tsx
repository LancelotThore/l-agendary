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
import Link from "next/link";
import { StarIcon } from "@/components/ui/icons";

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

function Calendar({ events, user }) {

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
        start: event.startDate.date,
        end: event.endDate.date,
        description: event.description,
        url: `/event/${event.id}`,
        creator: event.creator,
        userConnected: user.email
      }))} // Transformez les événements pour FullCalendar
    />
  );
}

function renderEventContent(eventInfo) {

  let creatorEmail = eventInfo.event.extendedProps.creator;
  let userAuth = eventInfo.event.extendedProps.userConnected;

  return (
    <Link className={`flex flex-col p-2 w-full h-full text-white no-underline decoration-white ${creatorEmail === userAuth ? 'bg-destructive' : 'bg-blue-500'}`} href={eventInfo.event.url}>
      <b className="whitespace-normal text-white">{eventInfo.event.title}</b>
      {creatorEmail === userAuth ? (
        <div className="flex items-center gap-2 pt-2">
          <StarIcon className="w-3 h-3 text-white" />
          <p className="whitespace-wrap text-white">Propriétaire</p>
        </div>
      ) : (
        <p className="whitespace-wrap pt-2 text-white">
          {creatorEmail.length > 8
            ? `${creatorEmail.substring(0, 8)}...`
            : creatorEmail}
        </p>
      )}
    </Link>
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
        <Calendar events={events} user={user} /> // Passez les événements au composant Calendar
      ) : (
        <>
          <p>Connectez-vous pour accéder à votre calendrier</p>
        </>
      )}
    </div>
  );
}