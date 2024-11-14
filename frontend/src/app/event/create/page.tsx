"use client";

import { useState, FormEvent } from "react";
import { FormElement } from "@/components/ui/form/formElement";
import { FormRadioGroup } from "@/components/ui/form/formRadio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEvent } from "@/app/api/event";

export default function CreateEvent() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [privacy, setPrivacy] = useState(false);
    const [location, setLocation] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [creator, setCreator] = useState('/api/users/1');
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!image) {
            setError('Veuillez sélectionner une image.');
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            setError('La date de début doit être avant la date de fin.');
            return;
        }

        // Simuler l'URL de l'image
        const imageUrl = `${image.name}`;

        try {
            const response = await createEvent(title, description, privacy, location, startDate, endDate, imageUrl, creator);
            console.log("Form submitted successfully:", response);
        } catch (error) {
            setError(error.message);
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-5 md:py-10 md:px-16 bg-secondary flex flex-col items-center justify-center md:w-fit m-auto">
            <h1 className="text-2xl md:text-3xl md:px-16">Créer un nouvel événement</h1>
            <ul className="w-full mt-4 flex flex-col gap-3">
                <FormElement label="Titre" variant="input" type="text" id="title" name="title" placeholder="Titre" maxLength={40} required value={title} onChange={(e) => setTitle(e.target.value)} />
                <FormElement label="Description" variant="textarea" id="description" name="description" placeholder="Description" maxLength={500} rows={5} required value={description} onChange={(e) => setDescription(e.target.value)} />
                <FormRadioGroup label="Visibilité" name="privacy" options={[{ id: "public", label: "Public", value: "true" }, { id: "private", label: "Privé", value: "false" }]} value={privacy.toString()} onChange={(e) => setPrivacy(e.target.value === "true")} />
                <FormElement label="Lieu" variant="input" type="text" id="location" name="location" placeholder="Lieu" maxLength={255} required value={location} onChange={(e) => setLocation(e.target.value)} />
                <FormElement label="Date de début" variant="input" type="datetime-local" id="start_date" name="start_date" required value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                <FormElement label="Date de fin" variant="input" type="datetime-local" id="end_date" name="end_date" required value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                <FormElement label="Image de couverture" variant="file" id="image" name="image" accept="image/png, image/jpeg" required onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
                <li className="hidden">
                    <Input type="url" id="creator" name="creator" value={creator} readOnly />
                </li>
            </ul>
            {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
            )}
            <Button type="submit" variant={"accent"} className="mx-auto mt-6 ">Publier</Button>
        </form>
    );
}