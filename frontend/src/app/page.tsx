import Image from "next/image";
import { Agbalumo, Raleway } from 'next/font/google';
import { ToolCard } from "../components/ui/toolCard";
import { CardEvent } from "../components/ui/cardEvent";
import { Button } from '../components/ui/button';
import Link from 'next/link';

const agbalumo = Agbalumo({
  subsets: ['latin'],
  variable: '--font-test',
  weight: '400',
})
const raleway = Raleway({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-raleway',
})

let toolCards = [
  {
    title: 'Recherchez un événement',
    description: 'Trouvez ce qui vous convient !',
    icon: './research-red.svg',
    color: 'text-cardResearchPrimary',
  },
  {
    title: 'Créez un nouvel événement',
    description: 'Faisons de nouvelles choses, ensemble.',
    icon: './plus-blue.svg',
    color: 'text-cardCreatePrimary',
  }
];

let cards = [
  {
    nom: 'Nom pour voir bien plus',
    lieu: 'Lieu pour voir aussi',
    date: '85 janvier 2077',
    img: './paysage.webp',
  }
];


export default function Home() {

  const fetchEvents = async () => {
    try {
      const res = await fetch('https://localhost/api/highlighted-events');
      const data = await res.json();
      console.log(data);

    } catch (error) {
      console.error('Error fetching highlighted events:', error);
    }
  };
  fetchEvents();

  return (
    <div className="">
      <div className="flex flex-col bg-cover items-center bg-center p-24 rounded-lg" style={{ backgroundImage: "url('./bgToolCards.webp')" }}>
        <h1 className={`${agbalumo.className} text-3xl md:text-4xl pb-14 text-center text-secondary`}>L'Art de Planifier !</h1>
        <ul className="flex items-center flex-wrap justify-center gap-5">
          {toolCards.map((toolcard, id) => (
            <ToolCard
              key={id}
              id={id + 1}
              title={toolcard.title}
              description={toolcard.description}
              icon={toolcard.icon}
              color={toolcard.color}
            />
          ))}
        </ul>
      </div>

      <h2 className={`${raleway.className} text-base text-center md:text-3xl mt-20 mb-10`}>Evénements publics les plus populaires !</h2>
      {/* <ul className="flex items-center flex-col md:flex-row md:justify-center gap-[21px]"> */}
      <ul className="flex items-center gap-5 flex-col lg:grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {cards.map((card, id) => (
          <Link href={`/event/${id}`}>
            <CardEvent
              key={id}
              id={id + 1}
              nom={card.nom}
              lieu={card.lieu}
              date={card.date}
              img={card.img}
            />
          </Link>
        ))}
      </ul>
      <div className="text-center">
        <Button className="mt-10">Voir Plus</Button>
      </div>

      <h2 className={`${raleway.className} text-base text-center md:text-3xl mt-20 mb-10`}>A propos de nous</h2>
      <section className="w-full flex justify-center mb-20">
        <div className="w-9/12 flex flex-col gap-5 text-sm lg:text-base lg:flex-row-reverse md:w-full">
          <img className="object-cover rounded-md md:w-full lg:w-6/12" src="./teams.jpg" alt="Image teams" />
          <div className="flex flex-col justify-center gap-5 md:w-full lg:w-6/12 sm:text-sm md:text-base">
            <p><span className={`${agbalumo.className}`}>L'agendary</span> est une application conviviale qui permet à chacun de créer un événement en seulement quelques secondes. Que vous souhaitiez organiser une fête d'anniversaire intime, une grande convention, ou un événement culturel d'envergure, Agendary vous facilite la tâche.</p>
            <p>Avec Agendary, vous avez la possibilité de rendre votre événement privé, accessible uniquement aux personnes que vous invitez, ou public, ouvert à toute la communauté des utilisateurs. Cela vous donne un contrôle total sur qui peut voir et participer à vos événements.</p>
            <p>Peu importe le type d'événement – qu'il s'agisse d'une réunion de famille, d'une rencontre professionnelle ou d'un concert – vous pouvez non seulement le créer, mais aussi y participer facilement grâce à une interface intuitive et rapide.</p>
            <p>Créez, partagez et rejoignez les événements qui vous passionnent avec Agendary, et ne manquez jamais une occasion de vous divertir ou de vous connecter avec les autres!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
