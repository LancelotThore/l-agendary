import Image from "next/image";
import { Agbalumo, Raleway } from 'next/font/google';
import { ToolCard } from "./ui/components/toolCard";
import { CardEvent } from "./ui/components/cardEvent";
import { Button } from './ui/components/button';
import { Footer } from './ui/components/footer';

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
  },
  {
    nom: 'Nom pour voir',
    lieu: 'Lieu pour voir aussi',
    date: '85 janvier 2077',
    img: './paysage.webp',
  },
  {
    nom: 'Nom pour voir',
    lieu: 'Lieu pour voir aussi',
    date: '85 janvier 2077',
    img: './paysage.webp',
  },
  {
    nom: 'Nom pour voir',
    lieu: 'Lieu pour voir aussi',
    date: '85 janvier 2077',
    img: './paysage.webp',
  },
  {
    nom: 'Nom pour voir',
    lieu: 'Lieu pour voir aussi',
    date: '85 janvier 2077',
    img: './paysage.webp',
  },
  {
    nom: 'Nom pour voir',
    lieu: 'Lieu pour voir aussi',
    date: '85 janvier 2077',
    img: './paysage.webp',
  },
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
      {/* <ul className="flex items-center flex-col md:flex-row md:justify-center gap-[21px]"> */}
      <ul className="flex items-center gap-5 flex-col md:grid md:grid-cols-2 md:gap-5 md:px-10 lg:grid-cols-3">
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
      <div className="text-center">
        <Button className="mt-10">Voir Plus</Button>
      </div>

      <h2 className={`${raleway.className} text-base text-center md:text-3xl mt-20 mb-10`}>A propos de nous</h2>
      <section className="flex justify-center mb-10 px-10">
        <div className="w-72 flex flex-col gap-5 text-sm lg:text-base lg:flex-row md:w-full">
          <img className="object-cover rounded-md md:w-[650px] md:h-[400px]" src="./teams.png" alt="Image teams" />
          <div className="md:flex md:flex-col md:justify-center">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc volutpat pellentesque elit eget volutpat. Nullam tempus orci vitae dapibus commodo.</p>
            <p>Sed ut pulvinar turpis, quis blandit est. Aenean rhoncus varius neque, in sollicitudin mauris commodo eget. In ornare luctus blandit. Nam malesuada placerat urna id efficitur.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
