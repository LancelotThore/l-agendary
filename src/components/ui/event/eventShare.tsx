import React from 'react';
import { Instagram, Facebook, Whatsapp, Linkedin, Mail, Link } from '../icons';

export default function EventShare(props: any) {
    return (
        <div className='flex flex-col bg-secondary w-full lg:h-full rounded-lg p-1.5 md:px-8 md:py-5 w-fit hidden md:block' {...props}>
            <h4 className='mt-2.5 mb-5 font-bold text-xl md:text-2xl'>Partager</h4>
            <div className='flex gap-12 justify-evenly'>
                <div className='pb-16 pt-10'>
                    <p className='mb-8'>Via les réseaux</p>
                    <ul className='flex gap-5'>
                        <li><a href=""><Instagram className="w-10"/></a></li>
                        <li><a href=""><Facebook className='w-10'/></a></li>
                        <li><a href=""><Whatsapp className='w-10'/></a></li>
                        <li><a href=""><Linkedin className='w-10'/></a></li>
                    </ul>
                </div>
                <span className='w-px bg-border'></span>
                <div className=' pb-16 pt-10'>
                    <p className='mb-8'>Autres</p>
                    <ul className='flex gap-5'>
                        <li><a href=""><Mail className="w-10"/></a></li>
                        <li><a href=""><Link className='w-10'/></a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}