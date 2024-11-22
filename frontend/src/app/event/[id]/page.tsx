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
import { log } from "console";

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

  function extractDateAndTime(isoString) {
    const date = new Date(isoString);

    const localTime = new Date(date.getTime() - date.getTimezoneOffset() * -60000);

    const year = date.getFullYear();
    const month = String(localTime.getMonth() + 1).padStart(2, "0");
    const day = String(localTime.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const hours = String(localTime.getHours()).padStart(2, "0");
    const minutes = String(localTime.getMinutes()).padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    return { formattedDate, formattedTime };
  }

  const upEvent = async () => {
    const dataEvents = await fetchEvent(params.id);
    setEvent(dataEvents);
    const dataCreator = await fetchCreator(dataEvents.creator);
    setCreator(dataCreator);

    if (dataEvents) {
      const { formattedDate: startDate, formattedTime: startHourForm } = extractDateAndTime(dataEvents.start_date);
      const { formattedDate: endDate, formattedTime: endHourform } = extractDateAndTime(dataEvents.end_date);

      setId(dataEvents.id);
      setTitle(dataEvents.title);
      setDescription(dataEvents.description);
      setLocation(dataEvents.location);
      setEtat(dataEvents.privacy);
      setStartDate(startDate);
      setStartHour(startHourForm);
      setEndDate(endDate);
      setEndHour(endHourform);
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
    const startHourInt = parseInt(startHour.split(":")[0], 10);
    const endHourInt = parseInt(endHour.split(":")[0], 10);

    const combinedStartDateTime = new Date(`${startDate}T${startHourInt + 1}:00`).toISOString();
    const combinedEndDateTime = new Date(`${endDate}T${endHourInt + 1}:00`).toISOString();
    setError("");
    setSuccess("");

    if (!title || !description || !location || !startDate || !startHour || !endDate || !endHour) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    // Vérifier si la date et l'heure de début sont avant la date et l'heure de fin
    if (new Date(combinedStartDateTime) >= new Date(combinedEndDateTime)) {
      setError("La date et l'heure de début doivent être avant la date et l'heure de fin.");
      return;
    }

    try {
      await updateEvent(id, title, description, location, etat, combinedStartDateTime, combinedEndDateTime, image);
      setSuccess("Evènement mis à jour avec succès !");
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="hover:bg-primary/70 text-sm/[18px]">
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
                          name="title"
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
                          name="description"
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
                              onChange={() => setEtat(false)}
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
                              onChange={() => setEtat(true)}
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
                          name="location"
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
                            name="startdate"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="col-span-3"
                          />
                          <Input
                            id="starthour"
                            type="time"
                            name="startdate"
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
                            name="enddate"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                          <Input
                            id="endhour"
                            type="time"
                            name="enddate"
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
                          name="image"
                          type="file"
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <span className={`text-center pb-3 ${error == "" ? 'text-green-500' : 'text-red-500'}`}>{success}{error}</span>
                      <Button variant={"accent"} className="w-32 text-center mx-auto" onClick={handleEditEvent}>Mettre à jour</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
    </>
  );
}
