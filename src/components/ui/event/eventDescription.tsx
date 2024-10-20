import React from 'react';

export default function EventDescription(props: any) {
    return (
        <div className='flex flex-col w-full md:bg-secondary rounded-lg md:px-8 md:py-5 lg:h-full' {...props}>
            <h4 className='mt-2.5 mb-8 font-bold text-xl md:text-2xl'>Description</h4>
            <p className='line-clamp-3 md:line-clamp-none text-sm'>
                Rejoignez-nous pour un pique-nique convivial à Central Park ! Apportez votre panier, une couverture, et profitez d'une journée détente en pleine nature. Au programme : jeux, musique, et bonne humeur. C’est l’occasion idéale de se retrouver entre amis, de partager de bons plats, et de profiter du soleil. Que vous soyez adepte des jeux de plein air ou simplement envie de vous relaxer, ce moment promet d'être agréable pour tous. Rendez-vous près du lac à 12h. N'oubliez pas d'apporter ce que vous aimez manger et de la crème solaire !
            </p>
        </div>
    );
}