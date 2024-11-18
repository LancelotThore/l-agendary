'use client';

import { useState } from "react";
import { SearchBar } from "../searchBar";
import { SearchInput } from "../searchInput";
import { Input } from "../input";
import { Clock, LocationOn, PeopleFill, User, Filtre } from '../icons';
import { fetchSearchEvents, fetchUniqueLocations, fetchUniqueUserNames } from "@/app/api/event";

export default function Filter({ onSearchResults }) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = async (searchTerm) => {
    const results = await fetchSearchEvents(searchTerm);
    onSearchResults(results);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-5'>
        <SearchBar
          id="search"
          placeholder="Rechercher"
          type="search"
          value={searchTerm}
          onChange={handleChange}
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base w-full'
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
        <SearchInput
        img={<LocationOn className='w-4 md:w-6' />}
        fetchOptions={fetchUniqueLocations}
        placeholder="Lieu"
        />
        <SearchInput
        img={<User className='w-4 md:w-6' />}
        fetchOptions={fetchUniqueUserNames}
        placeholder="Créateur"
        />
        <SearchInput
        img={<PeopleFill className='w-4 md:w-6' />}
        fetchOptions={fetchUniqueUserNames}
        placeholder="Participants"
        />
      </div>
    </div>
  );
}