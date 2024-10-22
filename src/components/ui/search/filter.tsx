'use client';

import { useState } from "react";
import { SearchBar } from "../searchBar";
import { Input } from "../input";
import { Clock, LocationOn, PeopleFill, User, Filtre } from '../icons';

export default function Filter() {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-5'>
        <SearchBar
          id="search"
          placeholder="Rechercher"
          type="search"
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base w-full max-w-lg'
        />
        <button
          className='block md:hidden flex h-10 w-12 rounded-md border border-input items-center bg-background px-3 py-2 text-sm'
          onClick={toggleFilters}
        >
          <Filtre className='w-6' />
        </button>
      </div>
      <div className={`w-full flex-col gap-5 ${showFilters ? 'flex' : 'hidden'} md:grid md:grid-cols-4`}>
        <Input
          img={<Clock className='w-4 md:w-6' />}
          type="datetime-local"
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base bg-secondary'
        />
        <SearchBar
          id="search-lieux"
          startImg={<LocationOn className='w-4 md:w-6' />}
          placeholder="Lieux"
          type="search"
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base'
        />
        <SearchBar
          id="search-createur"
          startImg={<User className='w-4 md:w-6' />}
          placeholder="Créateur"
          type="search"
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base'
        />
        <SearchBar
          id="search-participant"
          startImg={<PeopleFill className='w-4 md:w-6' />}
          placeholder="Participants"
          type="search"
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base'
        />
      </div>
    </div>
  );
}