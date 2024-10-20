import React from 'react';
import { Clock, LocationOn, PeopleFill, LockOpenIcon, LockClosedIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

export default function EventHeader(props: any) {
    return (
        <div className='flex w-full rounded-lg px-3 md:px-8 md:py-5 bg-gradient-to-b from-transparent from-45% to-primary min-h-72 md:min-h-fit relative overflow-hidden items-end md:bg-none md:bg-secondary text-primary-foreground md:text-secondary-foreground lg:h-full lg:items-start' {...props}>
            <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Card" className='absolute z-[-10] w-full h-full left-0 object-cover rounded-lg md:hidden'/>
            <div className='w-full flex flex-col mt-48 md:mt-0 mb-6 gap-2 lg:justify-between lg:h-full'>
                <div className='flex items-center md:items-start md:flex-col gap-2 mb-1'>
                    <h1 className='text-xl md:text-2xl font-bold'>Pique-nique Festif</h1>
                    <Button variant='private' size='sm'>Public<LockClosedIcon className='w-4 ml-2' /></Button>
                </div>
                <span className='flex items-center gap-1.5 font-semibold'><Clock className='w-5'/><p>Samedi 17 août 2029 - 11h à 14h</p></span>
                <span className='flex items-center gap-1.5 font-semibold'><LocationOn className='w-5'/><p>Central Park, New York</p></span>
                <span className='flex items-center gap-1.5 font-semibold'><PeopleFill className='w-5'/><p>24 participants</p></span>
            </div>
        </div>
    );
}