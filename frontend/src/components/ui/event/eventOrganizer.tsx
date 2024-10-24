import Link from 'next/link';

interface Organisateur {
  name: string;
  age: number;
  description: string;
  image: string;
}

interface EventOrganizerProps {
  organisateur: Organisateur;
}

export default function EventOrganizer({ organisateur }: EventOrganizerProps) {
  return (
    <div className="flex w-full p-1.5 bg-secondary rounded-lg gap-2 md:gap-6 md:px-8 md:py-5 lg:h-full shadow-md">
      <div className="aspect-square w-32 md:w-auto lg:order-2">
        <img
          className="rounded-lg object-cover h-full w-full"
          src={`${organisateur.image}`}
          alt={`Image de profil de ${organisateur.name}`}
        />
      </div>
      <div className="flex flex-col overflow-hidden h-fit lg:h-full w-full">
        <h4 className="hidden md:block ml-3 mt-2.5 mb-8 font-bold text-xl md:text-2xl">
          Organisateur
        </h4>
        <div className="flex gap-11 mb-5 font-semibold">
          <p>{organisateur.name}</p>
          <p className="mr-6">{organisateur.age} ans</p>
        </div>
        <p className="hidden md:block font-semibold">Bio :</p>
        <p className="line-clamp-3 md:line-clamp-none text-sm">
          {organisateur.description}
        </p>
      </div>
    </div>
  );
}
