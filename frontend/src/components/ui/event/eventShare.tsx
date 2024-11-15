"use client";

import { useEffect, useState } from 'react';
import { Instagram, Facebook, Whatsapp, Linkedin, Mail, Link } from '@/components/ui/icons';

const EventShare: React.FC = (props) => {
  const [shareUrl, setShareUrl] = useState('');
  const shareText = encodeURIComponent("Check out this event!");

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShareUrl(encodeURIComponent(window.location.href));
    }
  }, []);

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(decodeURIComponent(shareUrl))
        .then(() => {
          alert('Lien copié dans le presse-papiers !');
        })
        .catch(err => {
          console.error('Erreur lors de la copie du lien : ', err);
        });
    }
  };

  return (
    <div className='flex flex-col bg-secondary w-full lg:h-full rounded-lg p-1.5 md:px-8 md:py-5 w-fit hidden md:block shadow-md'>
      <h4 className='mt-2.5 mb-5 font-bold text-xl md:text-2xl'>Partager</h4>
      <div className='flex gap-12 justify-evenly'>
        <div className='pb-16 pt-10'>
          <p className='mb-8'>Via les réseaux</p>
          <ul className='flex gap-5 flex-wrap'>
            <li><a href={`https://www.instagram.com/yourprofile`} target="_blank" rel="noopener noreferrer"><Instagram className="w-10" /></a></li>
            <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer"><Facebook className='w-10' /></a></li>
            <li><a href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`} target="_blank" rel="noopener noreferrer"><Whatsapp className='w-10' /></a></li>
            <li><a href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}`} target="_blank" rel="noopener noreferrer"><Linkedin className='w-10' /></a></li>
          </ul>
        </div>
        <span className='w-px bg-border'></span>
        <div className='pb-16 pt-10'>
          <p className='mb-8'>Autres</p>
          <ul className='flex gap-5'>
            <li><a href={`mailto:?subject=${shareText}&=${shareUrl}`} target="_blank" rel="noopener noreferrer"><Mail className="w-10" /></a></li>
            <li><a href="#" onClick={copyToClipboard}><Link className='w-10' /></a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventShare;