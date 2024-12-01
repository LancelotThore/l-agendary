"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { confirmRegistration } from "../api/event";

export default function ConfirmRegistration() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            // Rediriger vers une autre page si le token n'est pas présent
            router.replace('/');
        }
    }, [searchParams, router]);

    const handleSubmit = async () => {
        const token = searchParams.get('token');
        if (token) {
            try {
                await confirmRegistration(token);
                setIsSuccess(true);
                setPopupMessage("Inscription réussie !");
            } catch (error: any) {
                if (error.message === 'Inscription déjà validée') {
                    setIsSuccess(false);
                    setPopupMessage("Erreur lors de l'inscription. Votre inscription a déjà été confirmée.");
                } else if (error.message === 'Invalid token') {
                    setIsSuccess(false);
                    setPopupMessage("Erreur lors de l'inscription. Le token est invalide. Veuillez vérifier le lien d'inscription.");
                } else if (error.message) {
                    setIsSuccess(false);
                    setPopupMessage("Erreur lors de l'inscription. Veuillez réessayer plus tard.");
                } else {
                    setIsSuccess(false);
                    setPopupMessage("Erreur inconnue. Veuillez réessayer.");
                }
            }
        }
    };

    const closePopup = () => {
        setPopupMessage(null);
        setIsSuccess(null);
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-base font-semibold text-center md:text-2xl">Inscription à votre évenement</h1>
            <Button onClick={handleSubmit}>Confirmer l'inscription</Button>
            {popupMessage && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-secondary p-6 rounded-lg shadow-lg w-96 flex gap-4 flex-col relative">
                        <button onClick={closePopup} type="button" className="absolute top-2 right-2 bg-transparent rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none">
                            <span className="sr-only">Close menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-lg font-bold">{isSuccess ? "Inscription réussie" : "Erreur"}</h2>
                        <p>{popupMessage}</p>
                        <Button onClick={closePopup}>Fermer</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
