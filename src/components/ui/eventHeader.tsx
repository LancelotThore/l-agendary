import React from 'react';
import { Clock, LocationOn, PeopleFill, LockOpenIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

const EventHeader = () => {
    return (
        <div className='flex w-full relative overflow-hidden items-end px-3 rounded-3xl'>
            <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Card" className='absolute z-[-10] w-full left-0 rounded-3xl'/>
            <div className='w-full flex flex-col mt-48'>
                <div className='flex items-center gap-2 mb-3'>
                    <h1 className='text-xl font-bold'>Pique-nique Festif</h1>
                    <Button variant='public' size='sm'>Public<LockOpenIcon className='w-4 ml-2' /></Button>
                </div>
                <span className='flex'><Clock className='w-5'/><p>Samedi 17 août 2029 - 11h à 14h</p></span>
                <span className='flex'><LocationOn className='w-5'/><p>Central Park, New York</p></span>
                <span className='flex'><PeopleFill className='w-5'/><p>24 participants</p></span>
            </div>
        </div>
    );
}

export default EventHeader;