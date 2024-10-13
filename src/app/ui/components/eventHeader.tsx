import React from 'react';
import { Clock, LocationOn, PeopleFill, Unlock } from './icons';

const EventHeader = () => {
    return (
        // <div className="relative bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70 w-full text-white">
        //     <img className="w-full h-auto rounded-xl" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Card Image" />
        //     <div className="absolute bottom-0 start-0 end-0 bg-gradient-to-t from-black rounded-xl">
        //         <div className="p-4 md:p-5">
        //             <h3 className="text-lg font-bold">
        //                 Card title
        //             </h3>
        //             <p className="mt-1">
        //                 Some quick example text to build on the card title and make up the bulk of the card's content.
        //             </p>
        //             <p className="mt-5 text-xs text-gray-500 dark:text-neutral-500">
        //                 Last updated 5 mins ago
        //             </p>
        //         </div>
        //     </div>
        // </div>
        
        <div className='flex w-full h-72 relative overflow-hidden items-end px-3'>
            <img src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80" alt="Card" className='absolute z-[-10] w-full left-0'/>
            <div className='w-full'>
                <h1>Pique-nique Festif</h1>
                <span><p>Public</p><Unlock className=""/></span>
                <span><Clock className=''/><p>Samedi 17 août 2029 - 11h à 14h</p></span>
                <span><LocationOn className=''/><p>Central Park, New York</p></span>
                <span><PeopleFill className=''/><p>24 participants</p></span>
            </div>
        </div>
    );
}

export default EventHeader;