"use client";

import EventHeader from "@/components/ui/event/eventHeader";
import EventOrganizer from "@/components/ui/event/eventOrganizer";
import EventDescription from "@/components/ui/event/eventDescription";
import EventShare from "@/components/ui/event/eventShare";
import { Button } from "@/components/ui/button";
import { fetchEvent, fetchCreator, joinEvent, isUserRegistered, leaveEvent } from "@/app/api/event";
import { fetchUser } from "@/app/api/data";
import { useEffect, useState } from "react";
import PageEventSkeleton from "./loading";
import { toast } from "sonner"

export default function Event({ params }) {
  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [user, setUser] = useState(null);
  const [joinSuccess, setJoinSuccess] = useState('');
  const [joinError, setJoinError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dataEvents = await fetchEvent(params.id);
      setEvent(dataEvents);
      const dataCreator = await fetchCreator(dataEvents.creator);
      setCreator(dataCreator);

      const user = await fetchUser();
      setUser(user);

      if (user) {
        const registered = await isUserRegistered(params.id);
        setIsRegistered(registered.isRegistered);
      }
    };
    fetchData();
  }, [params.id]);
  
  const handleJoinEvent = async () => {
    if (event) {
      try {
        const response = await joinEvent(event.id);
        toast("Vous avez rejoint l'événement");
        setIsRegistered(true); // Mettre à jour l'état pour actualiser le bouton
      } catch (error) {
        toast('Erreur lors de l\'inscription à l\'événement.');
      }
    }
  };

  const handleLeaveEvent = async () => {
    if (event) {
      try {
        const response = await leaveEvent(event.id);
        toast("Vous avez quitté l'événement");
        setIsRegistered(false); // Mettre à jour l'état pour actualiser le bouton
      } catch (error) {
        toast('Erreur lors de la désinscription de l\'événement.');
      }
    }
  };

  return (
    <>
      {event && creator ? (
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-7">
          <img
            src={`/uploads/event_pictures/${event.image}`}
            alt="Card"
            className="rounded-lg hidden object-cover md:block w-full col-span-7 h-96 shadow-md"
          />
          <div className="lg:col-span-3">
            <EventHeader event={event} />
          </div>
          <div className="lg:col-span-4">
            <EventOrganizer organisateur={creator} />
          </div>
          <div className="lg:col-span-3 xl:col-span-4">
            <EventDescription description={event.description} />
          </div>
          <div className="lg:col-span-4 xl:col-span-3">
            <EventShare />
          </div>
          <div className="flex items-center justify-center gap-4 lg:col-span-7">
            <Button className="md:hidden" size={"lg"}>
              Partager
            </Button>
            <Button variant={isRegistered ? "destructive" : "accent"} size={"lg"} onClick={isRegistered ? handleLeaveEvent : handleJoinEvent}>
              {isRegistered ? "Quitter l'événement" : "Rejoindre"}
            </Button>
            {user && user.id === creator.id && (
              <Button size={"lg"}>Modifier l'événement</Button>
            )}
          </div>
        </div>
      ) : (
        <PageEventSkeleton />
      )}
    </>
  );
}
