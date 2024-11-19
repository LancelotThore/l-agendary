'use client';

import { useState, useEffect } from "react";
import { SearchBar } from "../searchBar";
import { SearchInput } from "../searchInput";
import { Input } from "../input";
import { Clock, LocationOn, PeopleFill, User, Filtre } from '../icons';
import { fetchSearchEvents, fetchUniqueLocations, fetchUniqueUserNames } from "@/app/api/event";

const ITEMS_PER_PAGE = 9;

export default function Filter({ onSearchResults }) {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [limit] = useState(ITEMS_PER_PAGE);
  const [offset] = useState(0);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleSearch = async () => {
    const results = await fetchSearchEvents(searchTerm, location, date, limit, offset);
    onSearchResults(results);
  };

  useEffect(() => {
    handleSearch();
  }, [searchTerm, location, date, limit, offset]);

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLocationSelect = async (selectedLocation: string) => {
    setLocation(selectedLocation);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex items-center gap-5'>
        <SearchBar
          id="search"
          placeholder="Rechercher"
          type="search"
          value={searchTerm}
          onChange={handleSearchTermChange}
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
          type="date"
          className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base bg-secondary'
          onChange={handleDateChange}
        />
        <SearchInput
          img={<LocationOn className='w-4 md:w-6' />}
          fetchOptions={fetchUniqueLocations}
          placeholder="Lieu"
          onSelect={handleLocationSelect}
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