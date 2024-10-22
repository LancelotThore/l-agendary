// page.tsx
import { FormElement } from "@/components/ui/formElement";
import { FormRadioGroup } from "@/components/ui/FormRadio";
import { Button } from "@/components/ui/button";

export default function CreateEvent() {
  return (
    <form action="POST" className="p-5 md:py-10 md:px-16 bg-secondary flex flex-col items-center justify-center md:w-fit m-auto">
      <h1 className="text-2xl md:text-3xl">Créer un nouvel événement</h1>
      <ul className="w-full mt-4 flex flex-col gap-3">
        <FormElement label="Titre" variant="input" type="text" id="title" name="title" placeholder="Titre" maxLength={40} required />
        <FormElement label="Description" variant="textarea" id="description" name="description" placeholder="Description" maxLength={500} rows={5} />
        <FormRadioGroup label="Visibilité" name="visibility" options={[{ id: "public", label: "Public" }, { id: "private", label: "Privé" }]} />
        <FormElement label="Lieu" variant="input" type="text" id="location" name="location" placeholder="Lieu" maxLength={255} />
        <FormElement label="Date de début" variant="input" type="datetime-local" id="statDateTime" name="statDateTime" />
        <FormElement label="Date de fin" variant="input" type="datetime-local" id="endDateTime" name="endDateTime" />
        <FormElement label="Image de couverture" variant="file" id="imageDeCouverture" name="imageDeCouverture" accept="image/png, image/jpeg" />
        <li className="hidden">
          <input type="number" id="creator" name="creator" />
        </li>
      </ul>
      <Button variant={"accent"} className="mx-auto mt-6 ">Publier</Button>
    </form>
  );
}