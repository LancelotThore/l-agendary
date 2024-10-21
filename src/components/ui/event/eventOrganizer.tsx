"use client";

import { useEffect, useRef } from 'react';

interface Organisateur {
    name: string;
    age: number;
    description: string;
    image: string;
}

interface EventOrganizerProps {
    organisateur: Organisateur;
}

export default function EventOrganizer({ organisateur }: EventOrganizerProps) {
    // const imgRef = useRef<HTMLImageElement>(null);
    // const div2Ref = useRef<HTMLDivElement>(null);

    // useEffect(() => {
    //     if (imgRef.current && div2Ref.current) {
    //         const div2Style = getComputedStyle(div2Ref.current);
    //         const div2PaddingTop = parseFloat(div2Style.paddingTop);
    //         const div2PaddingBottom = parseFloat(div2Style.paddingBottom);
    //         const div2Height = div2Ref.current.offsetHeight + div2PaddingTop + div2PaddingBottom;
    //         imgRef.current.style.height = `${div2Height}px`;
    //     }
    // }, []);

    return (
        <div className='flex w-full p-1.5 bg-secondary rounded-lg gap-2 md:gap-6 md:px-8 md:py-5 lg:h-full'>
            <div>
                <img className='rounded-lg object-cover md:order-2 h-full' src={`${organisateur.image}`} alt={`Image de profil de ${organisateur.name}`} />
            </div>
            <div className='flex flex-col w-full overflow-hidden h-fit lg:h-full'>
                <h4 className='hidden md:block ml-3 mt-2.5 mb-8 font-bold text-xl md:text-2xl'>Organisateur</h4>
                <div className='flex justify-between gap-2 mb-5 font-semibold'>
                    <p>{organisateur.name}</p>
                    <p className='mr-6'>{organisateur.age} ans</p>
                </div>
                <p className='hidden md:block font-semibold'>Bio :</p>
                <p className='line-clamp-3 md:line-clamp-none text-sm'>{organisateur.description}</p>
            </div>
        </div>
    );
}