import React from 'react';
import { Clock, LocationOn, PeopleFill, LockOpenIcon, LockClosedIcon } from '@/components/ui/icons';
import { Button } from '@/components/ui/button';

const EventAuthor = () => {
    return (
        <div className='flex w-full p-1.5 bg-secondary rounded-lg max-'>
            <img className='rounded-lg w-20 aspect-square' src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="" />
            <div className='flex'>
                <p>Robert Down Jr.</p>
                <p>59 ans</p>
            </div>
            <p>Je suis Robert Down Jr. , New-Yorkais passionné par les sorties en plein air. J'adore explorer la ville avec mes...</p>
        </div>
    );
}

export { EventAuthor };