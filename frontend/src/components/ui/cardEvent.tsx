import { Raleway } from 'next/font/google';

const ralewayBold = Raleway({
  subsets: ['latin'],
  weight: ['600'],
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
      className="flex justify-between items-center bg-white h-32 md:w-full 4xl:w-[480px] rounded-3xl shadow-md cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 overflow-hidden"
    >
      <section className='flex flex-col justify-between w-full h-full p-3.5 pr-0'>
        <div className='text-sm md:text-lg'>
          <p className={`${ralewayBold.className}`}>{nom}</p>
          <p className={`${ralewayMedium.className}`}>{lieu}</p>
        </div>
        <div className='flex gap-2 text-cardDate text-xs md:text-sm'>
          <img src="./calendar.svg" alt="calendar Icon" />
          <p className={`${ralewayMedium.className}`}>{date}</p>
        </div>
      </section>
      <section className='w-5/12 h-full sm:w-6/12'>
        <img className='object-cover w-full h-full' src={`/uploads/event_images/${img}`} alt="Img évènement" />
      </section>
    </li>
  );
}