"use client";

import EventHeader from "@/components/ui/event/eventHeader";
import EventOrganizer from "@/components/ui/event/eventOrganizer";
import EventDescription from "@/components/ui/event/eventDescription";
import EventShare from "@/components/ui/event/eventShare";
import { Button } from "@/components/ui/button";
import { fetchEvent, fetchCreator, createEventRegistration } from "@/app/api/event";
import { fetchUser } from "@/app/api/data";
import { useEffect, useState } from "react";
import PageEventSkeleton from "./loading";
import Link from 'next/link'; 
import { FormElement } from "@/components/ui/form/formElement";

export default function Event({ params }) {
  const [event, setEvent] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const dataEvent = await fetchEvent(params.id);
      setEvent(dataEvent);
    };
    fetchData();

    const loadUser = async () => {
      try {
          const userData = await fetchUser();
          setUser(userData); // userData sera null si non connecté
      } catch (err) {
          console.error("Erreur lors de la récupération de l'utilisateur :", err);
      }
    };

    loadUser();
  }, [params.id]);

  const handleJoinClick = () => {
    if (!user) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormEmail(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const updatedForm = {
      email: formEmail,
      event: event.id,
    };
  
    try {
      await createEventRegistration(updatedForm.email, updatedForm.event);
      setIsModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Erreur lors de l'inscription à l'événement :", error);
      setErrorMessage("Erreur lors de l'inscription à l'événement. Veuillez réessayer.");
    }
  };

  return (
    <>
      {event ? (
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
            <EventOrganizer organisateur={event.creator} />
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
            <Button variant={"accent"} size={"lg"} onClick={handleJoinClick}>
              Rejoindre
            </Button>
            {user && user.id === event.creator.id && (
              <Button size={"lg"}>Modifier l'événement</Button>
            )}
          </div>
        </div>
      ) : (
        <PageEventSkeleton />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-secondary p-6 rounded-lg shadow-lg w-96 flex gap-4 flex-col relative">
            <button onClick={closeModal} type="button" className="absolute top-2 right-2 bg-transparent rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold ">Connexion à l'application</h2>
            <p className="">En vous connectant, vous pouvez vous inscrire à plusieurs événements et les suivre facilement.</p>
            <Link className="h-fit w-fit" href="/login"><Button>Se connecter</Button></Link>
            <hr/>
            <h2 className="text-lg font-bold ">Inscription par email</h2>
            <p className="">Vous pouvez également vous inscrire avec votre adresse mail, sans connexion. Un email vous sera envoyé.</p>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>            
              <FormElement
                variant="input"
                type="email"
                placeholder="Entrez votre email"
                id="email"
                name="email"
                maxLength={255}
                required
                value={formEmail}
                onChange={handleInputChange}
              />
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              <div className="flex justify-end gap-2">
                <Button type="submit" variant="accent">S'inscrire</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-secondary p-6 rounded-lg shadow-lg w-96 flex gap-4 flex-col relative">
            <button onClick={closeSuccessModal} type="button" className="absolute top-2 right-2 bg-transparent rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-lg font-bold ">Inscription réussie</h2>
            <p className="">Votre inscription a bien été prise en compte, vous allez recevoir un mail de confirmation.</p>
            <Button onClick={closeSuccessModal}>Fermer</Button>
          </div>
        </div>
      )}
    </>
  );
}