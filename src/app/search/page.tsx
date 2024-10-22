import Filter from '../../components/filter/page';
import { CardEvent } from '../../components/ui/cardEvent';
import Link from 'next/link'

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
    }
  ];

export default function SearchPage() {
    return (
        <div className='w-full'>
            <Filter></Filter>
            <ul className="flex items-center gap-5 my-10 flex-col lg:grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
                {cards.map((card, id) => (
                    <Link href='/event/{id}'>
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

        </div>
    );
}