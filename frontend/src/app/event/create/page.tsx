"use client";

import { useState, FormEvent } from "react";
import { FormElement } from "@/components/ui/form/formElement";
import { FormRadio } from "@/components/ui/form/formRadio";
import { Button } from "@/components/ui/button";
import { createEvent } from "@/app/api/event";
import { useRouter } from "next/navigation";

export default function CreateEvent() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        privacy: false,
        location: '',
        startDate: '',
        endDate: '',
        image: null as File | null,
        creator: '/api/users/1',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { title, description, privacy, location, startDate, endDate, image, creator } = formData;

        if (!image) {
            setError('Veuillez sélectionner une image.');
            return;
        }

        if (new Date(startDate) >= new Date(endDate)) {
            setError('La date de début doit être avant la date de fin.');
            return;
        }

        const imageUrl = `${image.name}`;

        try {
            const response = await createEvent(
                title, 
                description, 
                privacy, 
                location, 
                startDate, 
                endDate, 
                imageUrl, 
                creator
            );
            setSuccess("L'événement a été créé avec succès !");
            setTimeout(() => {
                router.push('/');
            }, 2000);
        } catch (error: any) {
            setError(error.message);
            console.error("Error submitting form:", error);
        }
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="p-5 md:py-10 md:px-16 bg-secondary flex flex-col items-center justify-center md:w-fit m-auto shadow-lg rounded-lg"
        >
            <h1 className="text-2xl md:text-3xl md:px-16">Créer un nouvel événement</h1>
            <ul className="w-full mt-4 flex flex-col gap-3">
                <FormElement 
                    label="Titre" 
                    variant="input" 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Titre" 
                    maxLength={40} 
                    required 
                    value={formData.title} 
                    onChange={handleChange} 
                />
                <FormElement 
                    label="Description" 
                    variant="textarea" 
                    id="description" 
                    name="description" 
                    placeholder="Description" 
                    maxLength={500} 
                    rows={5} 
                    required 
                    value={formData.description} 
                    onChange={handleChange} 
                />
                <FormRadio
                    label="Visibilité"
                    name="privacy"
                    options={[
                        { id: "public", label: "Public", value: "true" },
                        { id: "private", label: "Privé", value: "false" }
                    ]}
                    value={formData.privacy.toString()}
                    onChange={(e) => setFormData(prevState => ({
                        ...prevState,
                        privacy: e.target.value === "true"
                    }))}
                />
                <FormElement 
                    label="Lieu" 
                    variant="input" 
                    type="text" 
                    id="location" 
                    name="location" 
                    placeholder="Lieu" 
                    maxLength={255} 
                    required 
                    value={formData.location} 
                    onChange={handleChange} 
                />
                <FormElement 
                    label="Date de début" 
                    variant="input" 
                    type="datetime-local" 
                    id="start_date" 
                    name="startDate" 
                    required 
                    value={formData.startDate} 
                    onChange={handleChange} 
                />
                <FormElement 
                    label="Date de fin" 
                    variant="input" 
                    type="datetime-local" 
                    id="end_date" 
                    name="endDate" 
                    required 
                    value={formData.endDate} 
                    onChange={handleChange} 
                />
                <FormElement 
                    label="Image de couverture" 
                    variant="file" 
                    id="image" 
                    name="image" 
                    accept="image/png, image/jpeg" 
                    required 
                    onChange={handleChange} 
                />
                <li className="hidden">
                    <input 
                        type="url" 
                        id="creator" 
                        name="creator" 
                        value={formData.creator} 
                        readOnly 
                    />
                </li>
            </ul>
            {error && (
                <div className="text-red-500 text-center mt-4">{error}</div>
            )}
            {success && (
                <div className="text-green-500 text-center mt-4">{success}</div>
            )}
            <Button 
                type="submit" 
                variant={"accent"} 
                className="mx-auto mt-6"
            >
                Publier
            </Button>
        </form>
    );
}