import { Raleway } from 'next/font/google';

const ralewayBold = Raleway({
  subsets: ['latin'],
  weight: ['900'],
  variable: '--font-raleway',
});

const ralewayMedium = Raleway({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-raleway',
});

interface ToolCardProps {
  id: number;
  nom: string;
  lieu: string;
  date: string;
  img: string;
}

export function CardEvent({ nom, lieu, date, img, id }: ToolCardProps) {
  return (
    <li
      key={id}
      className="group flex justify-between items-center bg-white w-72 md:w-96 rounded-2xl shadow-md p-3.5 cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden"
    >
      <section>
        <div>
          <p>{nom}</p>
          <p>{lieu}</p>
        </div>
        <div>
          <img src="./calendar.svg" alt="calendar Icon" />
          <p>{date}</p>
        </div>
      </section>
      <section>
        <img src={img} alt="Img évènement" />
      </section>
    </li>
  );
}