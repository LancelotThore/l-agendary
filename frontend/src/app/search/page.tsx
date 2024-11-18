'use client';

import { useState, useEffect } from "react";
import Link from 'next/link';
import Filter from "@/components/ui/search/filter";
import { CardEvent } from "@/components/ui/cardEvent";
import Pagination from "@/components/ui/search/pagination";
import { fetchPrivatedEvents } from "../api/event";

const ITEMS_PER_PAGE = 9;

export default function SearchPage() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const dataEvents = await fetchPrivatedEvents();
      console.log("fetch", dataEvents);
      setEvents(dataEvents);
      setTotalPages(Math.ceil(dataEvents.length / ITEMS_PER_PAGE));
    };
    fetchData();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  console.log(events);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedEvents = events.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className='w-full'>
      <Filter />
      <ul className="flex items-center gap-5 my-10 flex-col lg:grid lg:grid-cols-2 lg:gap-5 xl:grid-cols-3">
        {selectedEvents.map((event, index) => (
          <Link href={`/event/${event.id}`} key={index}>
            <CardEvent
              nom={event.title}
              lieu={event.location}
              startDate={event.start_date}
              endDate={event.end_date}
              img={event.image}
              id={event.id}
            />
          </Link>
        ))}
      </ul>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}