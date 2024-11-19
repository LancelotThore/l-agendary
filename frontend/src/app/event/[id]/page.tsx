"use client";

import EventHeader from "@/components/ui/event/eventHeader";
import EventOrganizer from "@/components/ui/event/eventOrganizer";
import EventDescription from "@/components/ui/event/eventDescription";
import EventShare from "@/components/ui/event/eventShare";
import { Button } from "@/components/ui/button";
import { fetchEvent, fetchCreator, updateEvent } from "@/app/api/event";
import { ArrowLeft, LockOpenIcon, LockClosedIcon } from "@/components/ui/icons";
import { fetchUser } from "@/app/api/data";
import { useEffect, useState } from "react";
import PageEventSkeleton from "./loading";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Event({ params }) {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [etat, setEtat] = useState(null);
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endHour, setEndHour] = useState("");
  const [image, setImage] = useState("");

  const [event, setEvent] = useState(null);
  const [creator, setCreator] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function extractDateAndTime(isoString: string) {
    const date = new Date(isoString);
    const formattedDate = date.toISOString().split("T")[0]; // Format YYYY-MM-DD
    const formattedTime = date.toTimeString().split(" ")[0].slice(0, 5); // Format HH:mm
    return { formattedDate, formattedTime };
  }

  const upEvent = async () => {
    const dataEvents = await fetchEvent(params.id);
    setEvent(dataEvents);
    const dataCreator = await fetchCreator(dataEvents.creator);
    setCreator(dataCreator);

    if (dataEvents) {
      const { formattedDate: startDate, formattedTime: startHour } = extractDateAndTime(dataEvents.start_date);
      const { formattedDate: endDate, formattedTime: endHour } = extractDateAndTime(dataEvents.end_date);

      setId(dataEvents.id);
      setTitle(dataEvents.title);
      setDescription(dataEvents.description);
      setLocation(dataEvents.location);
      setEtat(dataEvents.privacy);
      setStartDate(startDate);
      setStartHour(startHour);
      setEndDate(endDate);
      setEndHour(endHour);
      setImage(dataEvents.image);
    }
    setLoading(false);
  };

  useEffect(() => {
    upEvent();

    const user = fetchUser();
    setUser(user);
  }, []);

  const handleEditEvent = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, title, description, location, etat, startDate, startHour, endDate, endHour, image);
      setSuccess("Evènement mis à jour avec succès");
      upEvent();
    } catch (err) {
      setError("Erreur lors de la mise à jour des informations de l'évènement");
    }
  };

  return (
    <>
      {event && creator ? (
        <>
          {!loading && (
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-7 relative">
              <a href="/">
                <ArrowLeft className="absolute -top-10 -left-12" />
              </a>
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
          )}
        </>
      ) : (
        <>
          {loading ? (
            <PageEventSkeleton />
          ) : (
            <div className="flex justify-center items-center flex-col gap-5">
              <p className="text-center">L'événement que vous recherchez n'existe pas...</p>
              <Link href="/">
                <Button size={"lg"}>Accueil</Button>
              </Link>
            </div>
          )}
        </>
      )}

      <Dialog>
        <DialogTrigger asChild>
          <Button className="hover:bg-primary/70 mb-2 mr-2">
            Modifier l'évènement
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[650px]">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Modifier l'évènement</DialogTitle>
          </DialogHeader>
          <div className="sm:px-10 px-0 h-[516px] overflow-y-scroll">
            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="title" className="text-left">
                Titre de l’événement
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="descrition" className="text-left">
                Description
              </label>
              <Input
                id="title"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap mt-2">
              <label htmlFor="etat" className="text-left">
                Etat
              </label>
              <div className="flex flex-row gap-4">

                <div className="flex flex-row gap-1">
                  <input
                    id="etat"
                    type="radio"
                    name="etat"
                    className="col-span-3"
                    defaultChecked={!etat}
                  />
                  <Button variant={"private"} size="sm">
                    Privé
                    <LockClosedIcon className="w-4 ml-2" />
                  </Button>
                </div>
                <div className="flex flex-row gap-1">
                  <input
                    id="etat"
                    type="radio"
                    name="etat"
                    className="col-span-3"
                    defaultChecked={etat}
                  />
                  <Button variant={"public"} size="sm">
                    Public
                    <LockOpenIcon className="w-4 ml-2" />
                  </Button>
                </div>

              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="location" className="text-left">
                Lieu
              </label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="startdate" className="text-left">
                Date de début
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="startdate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="col-span-3"
                />
                <Input
                  id="starthour"
                  type="time"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="enddate" className="text-left">
                Date de fin
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="enddate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <Input
                  id="endhour"
                  type="time"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1 mt-2">
              <label htmlFor="image" className="text-left">
                Image de couverture
              </label>
              <img src={image} alt="Image de converture evenement" className="w-32 h-32 rounded" />
              <Input
                id="image"
                type="file"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant={"accent"} className="text-center mx-auto" onClick={handleEditEvent}>Mettre à jour</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
