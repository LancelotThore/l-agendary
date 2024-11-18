"use client";

import EventHeader from "@/components/ui/event/eventHeader";
import EventOrganizer from "@/components/ui/event/eventOrganizer";
import EventDescription from "@/components/ui/event/eventDescription";
import EventShare from "@/components/ui/event/eventShare";
import { Button } from "@/components/ui/button";
import { fetchEvent, fetchCreator } from "@/app/api/event";
import { fetchUser } from "@/app/api/data";
import { useEffect, useState } from "react";

export default function Event({ params }) {
  const [event, setEvent] = useState([]);
  const [creator, setCreator] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const dataEvents = await fetchEvent(params.id);
      setEvent(dataEvents);
      const dataCreator = await fetchCreator(dataEvents.creator);
      setCreator(dataCreator);
    };
    fetchData();

    const user = fetchUser();
    setUser(user);
  }, []);

  return (
    <div className="flex flex-col gap-8 lg:grid lg:grid-cols-7">
      <img
        src={event.image}
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
        <Button variant={"accent"} size={"lg"}>
          Rejoindre
        </Button>
        {user && user.id === creator.id && (
          <Button size={"lg"}>Modifier l'événement</Button>
        )}
      </div>
    </div>
  );
}
