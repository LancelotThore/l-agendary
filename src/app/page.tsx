import Image from "next/image";
import { Agbalumo, Raleway } from 'next/font/google';
import { ToolCard } from "./ui/components/toolCard";
import { CardEvent } from "./ui/components/cardEvent";

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
    nom: 'Recherchez un événement',
    lieu: 'Trouvez ce qui vous convient !',
    date: '85 janvier 2077',
    img: './research-red.svg',
  },
  {
    nom: 'Créez un nouvel événement',
    lieu: 'Faisons de nouvelles choses, ensemble.',
    date: '30 janvier 2025',
    img: './plus-blue.svg',
  }
];


export default function Home() {
  return (
    <div className="bg-background">
      <h1 className={`${agbalumo.className} text-[32px] py-[57px] text-center`}>L'Art de Planifier !</h1>

      <ul className="flex items-center flex-col md:flex-row md:justify-center gap-[21px]">
        {toolCards.map((toolcard, id) => (
          <ToolCard
            id={id + 1}
            title={toolcard.title}
            description={toolcard.description}
            icon={toolcard.icon}
            color={toolcard.color}
          />
        ))}

      </ul>
      
      <h2 className={`${raleway.className} text-base text-center md:text-3xl mt-20 mb-10`}>Evénements publics les plus populaires !</h2>
      <ul className="flex items-center flex-col md:flex-row md:justify-center gap-[21px]">
        {cards.map((card, id) => (
          <CardEvent
            id={id + 1}
            nom={card.nom}
            lieu={card.lieu}
            date={card.date}
            img={card.img}
          />
        ))}
      </ul>
    </div>
  );
}
