import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export default function CreateEvent() {
    return (
        <form action="POST" className="p-5 md:py-10 md:px-16 bg-secondary flex flex-col items-center justify-center md:w-fit m-auto">
            <h1 className="text-2xl md:text-3xl">Créer un nouvel événement</h1>
            <ul className="w-full mt-4 flex flex-col gap-3">
                <li className="flex flex-col gap-1">
                    <label htmlFor="title">Titre</label>
                    <Input placeholder="Titre" type="text" maxLength={40} required name="title" id="title"></Input>
                </li>
                <li className="flex flex-col gap-1">
                    <label htmlFor="description">Description</label>
                    <textarea className="p-1.5 border-border border rounded-lg focus:border-border bg-background" name="description" id="description" maxLength={500} placeholder="Description" rows={5}></textarea>
                </li>
                <li className="flex flex-col gap-1">
                    <p>Visibilité</p>
                    <ul className="flex gap-3 flex-wrap">
                        <li className="flex gap-2 items-center">
                            <Input type="radio" id="public" name="visibility" className="h-fit"></Input>
                            <label htmlFor="public">Public</label>
                        </li>
                        <li className="flex gap-2 items-center">
                            <Input type="radio" id="private" name="visibility" className="h-fit"></Input>
                            <label htmlFor="private">Privé</label>
                        </li>
                    </ul>
                </li>
                <li className="flex flex-col gap-1">
                    <label htmlFor="location">Lieu</label>
                    <Input type="text" maxLength={255} placeholder="Lieu"></Input>
                </li>
                <li className="flex flex-col gap-1">
                    <label htmlFor="statDateTime">Date de début</label>
                    <Input type="datetime-local" id="statDateTime" name="statDateTime"></Input>
                </li>
                <li className="flex flex-col gap-1">
                    <label htmlFor="endDateTime">Date de fin</label>
                    <Input type="datetime-local" id="endDateTime" name="endDateTime"></Input>
                </li>
                <li className="flex flex-col gap-1">
                    <p>Image de couverture</p>
                    <input className="hidden" type="file" id="imageDeCouverture" name="imageDeCouverture" accept="image/png, image/jpeg" />
                    <label htmlFor="imageDeCouverture" className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md w-fit">
                        Choisir un fichier
                    </label>
                </li>
                <li className="hidden">
                    <input type="number" id="creator" name="creator"/>
                </li>
                <Input type="hidden"></Input>
                <Button variant={"accent"} className="m-auto">Publier</Button>
            </ul>
        </form>
    )
}