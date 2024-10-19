import React from 'react';

const EventOrganizer = () => {
    return (
        <div className='grid grid-cols-2 w-full p-1.5 bg-secondary rounded-lg gap-2' id="1">
            <div className=''>
                <img className='rounded-lg aspect-square object-cover h-full' src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8" alt="" />
            </div>
            <div className='flex flex-col justify-between w-full h-fit overflow-hidden gap-5' id="2">
                <div className='flex justify-between'>
                    <p>Robert Down Jr.</p>
                    <p className='mr-6'>59 ans</p>
                </div>
                <p className='line-clamp-3 text-sm'>Je suis Robert Down Jr. , New-Yorkais passionné par les sorties en plein air. J'adore explorer la ville avec mes amis, que ce soit pour une randonnée, une promenade à Central Park, ou une soirée animée. Toujours partant pour l'aventure, j'aime partager de bons moments et profiter de tout ce que New York a à offrir.</p>
            </div>
        </div>
    );
}

export { EventOrganizer };