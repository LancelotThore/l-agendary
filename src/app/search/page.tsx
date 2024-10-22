'use client';

import { useState, useEffect } from "react";
import Link from 'next/link';
import Filter from "@/components/ui/search/filter";
import { CardEvent } from "@/components/ui/cardEvent";
import Pagination from "@/components/ui//search/pagination";

const ITEMS_PER_PAGE = 20;

export default function SearchPage() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const fetchEvents = async (page: number) => {
    try {
      const response = await fetch(`/api/events?page=${page}&limit=${ITEMS_PER_PAGE}`);
      const data = await response.json();
      setEvents(data.events);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  return (
    <div className='w-full'>
      <Filter />
      <ul className="flex items-center gap-5 my-10 flex-col lg:grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {events.map((event, id) => (
          <Link href={`/event/${event.id}`} key={id}>
            <CardEvent
              id={event.id}
              nom={event.nom}
              lieu={event.lieu}
              date={event.date}
              img={event.img}
            />
          </Link>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}