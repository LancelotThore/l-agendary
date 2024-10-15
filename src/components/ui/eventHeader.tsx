import React from 'react';
import { Clock, LocationOn, PeopleFill, LockOpenIcon, LockClosedIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

const EventHeader = () => {
    return (
        <div className='flex w-full relative overflow-hidden items-end px-3 rounded-3xl bg-gradient-to-b from-transparent from-45% to-primary text-primary-foreground min-h-72 md:bg-none'>
            <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Card" className='absolute z-[-10] w-full h-full left-0 object-cover rounded-3xl'/>
            <div className='w-full flex flex-col mt-48 mb-6 gap-2 md:hidden'>
                <div className='flex items-center gap-2 mb-1'>
                    <h1 className='text-xl font-bold'>Pique-nique Festif</h1>
                    <Button variant='private' size='sm'>Public<LockClosedIcon className='w-4 ml-2' /></Button>
                </div>
                <span className='flex items-center gap-1.5'><Clock className='w-5'/><p>Samedi 17 août 2029 - 11h à 14h</p></span>
                <span className='flex items-center gap-1.5'><LocationOn className='w-5'/><p>Central Park, New York</p></span>
                <span className='flex items-center gap-1.5'><PeopleFill className='w-5'/><p>24 participants</p></span>
            </div>
        </div>
    );
}

export default EventHeader;