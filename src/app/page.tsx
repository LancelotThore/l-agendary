import Image from "next/image";
import { Agbalumo, Raleway } from 'next/font/google';
import { ToolCard } from "./ui/components/toolCard";
import { Card } from "./ui/components/card";

const agbalumo = Agbalumo({
  subsets: ['latin'],
  variable: '--font-test',
  weight: '400',
})
const raleway = Raleway({
  subsets: ['latin'],
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
      color:'text-cardCreatePrimary',   
  }
];

let cards = [
  {
      title: 'Recherchez un événement',
      description: 'Trouvez ce qui vous convient !',
      icon: './research-red.svg',
    },
    {
      title: 'Créez un nouvel événement',
      description: 'Faisons de nouvelles choses, ensemble.',
      icon: './plus-blue.svg',
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

        {/* {cards.map((card, id) => (
          <Card
            id={id + 1}
            title={card.title}
            description={card.description}
            img={icon}
        />
        ))} */}
      </ul>
    </div>
  );
}
