"use client";

import { useState } from "react";
import { FormElement } from "@/components/ui/formElement";
import { FormRadioGroup } from "@/components/ui/FormRadio";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    privacy: "public",
    location: "",
    start_date: "",
    end_date: "",
    image: null,
    creator: "https://example.com/",
    registered_users: "https://example.com/"
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    for (const key in formData) {
      form.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost/api/events", {
        method: "POST",
        body: form
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la création de l'événement");
      }

      alert("Événement créé avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création de l'événement");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 md:py-10 md:px-16 bg-secondary flex flex-col items-center justify-center md:w-fit m-auto">
      <h1 className="text-2xl md:text-3xl md:px-16">Créer un nouvel événement</h1>
      <ul className="w-full mt-4 flex flex-col gap-3">
        <FormElement label="Titre" variant="input" type="text" id="title" name="title" placeholder="Titre" maxLength={40} required onChange={handleChange} />
        <FormElement label="Description" variant="textarea" id="description" name="description" placeholder="Description" maxLength={500} rows={5} required onChange={handleChange} />
        <FormRadioGroup label="Visibilité" name="privacy" options={[{ id: "public", label: "Public", required:true }, { id: "private", label: "Privé", required:true }]} onChange={handleChange} />
        <FormElement label="Lieu" variant="input" type="text" id="location" name="location" placeholder="Lieu" maxLength={255} required onChange={handleChange} />
        <FormElement label="Date de début" variant="input" type="datetime-local" id="start_date" name="start_date" required onChange={handleChange} />
        <FormElement label="Date de fin" variant="input" type="datetime-local" id="end_date" name="end_date" required onChange={handleChange} />
        <FormElement label="Image de couverture" variant="file" id="image" name="image" accept="image/png, image/jpeg" required onChange={handleChange} />
        <li className="hidden">
            <Input type="url" id="creator" name="creator" value="https://example.com/" required readOnly></Input>
            <Input type="hidden" id="registered_users" name="registered_users" value="https://example.com/"></Input>
        </li>
      </ul>
      <Button variant={"accent"} className="mx-auto mt-6 ">Publier</Button>
    </form>
  );
}