'use client';

import { useState } from "react";
import Link from 'next/link';
import Filter from "@/components/filter/page";
import { CardEvent } from "@/components/ui/cardEvent";
import { Button } from "@/components/ui/button";

const cards = [
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

const ITEMS_PER_PAGE = 6;
const MAX_PAGE_BUTTONS = 5;

export default function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCards = cards.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const renderPageButtons = () => {
    const pages = [];
    const halfMaxButtons = Math.floor(MAX_PAGE_BUTTONS / 2);

    let startPage = Math.max(1, currentPage - halfMaxButtons);
    let endPage = Math.min(totalPages, currentPage + halfMaxButtons);

    if (currentPage <= halfMaxButtons) {
      endPage = Math.min(totalPages, MAX_PAGE_BUTTONS);
    } else if (currentPage + halfMaxButtons >= totalPages) {
      startPage = Math.max(1, totalPages - MAX_PAGE_BUTTONS + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          onClick={() => handlePageClick(i)}
          className={currentPage === i ? 'bg-primary/50 hover:bg-primary/50' : ''}
        >
          {i}
        </Button>
      );
    }

    if (startPage > 1) {
      pages.unshift(
        <Button key="1" onClick={() => handlePageClick(1)}>
          1
        </Button>
      );
      if (startPage > 2) {
        pages.splice(1, 0, <span key="start-ellipsis">...</span>);
      }
    }

    if (endPage < totalPages) {
      pages.push(
        <Button key={totalPages} onClick={() => handlePageClick(totalPages)}>
          {totalPages}
        </Button>
      );
      if (endPage < totalPages - 1) {
        pages.splice(pages.length - 1, 0, <span key="end-ellipsis">...</span>);
      }
    }

    return pages;
  };

  return (
    <div className='w-full'>
      <Filter />
      <ul className="flex items-center gap-5 my-10 flex-col lg:grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {currentCards.map((card, id) => (
          <Link href={`/event/${id + startIndex}`} key={id}>
            <CardEvent
              id={id + 1 + startIndex}
              nom={card.nom}
              lieu={card.lieu}
              date={card.date}
              img={card.img}
            />
          </Link>
        ))}
      </ul>
      <div className="flex justify-center items-center gap-2">
        <Button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Précédent
        </Button>
        <div className="flex gap-2">
          {renderPageButtons()}
        </div>
        <Button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Suivant
        </Button>
      </div>
    </div>
  );
}