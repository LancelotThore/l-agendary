import { Raleway } from 'next/font/google';

const ralewayBold = Raleway({
    subsets: ['latin'],
    weight: ['600'],
    variable: '--font-raleway',
});

const ralewayMedium = Raleway({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-raleway',
});

export function Footer() {
  return (
    <footer className='flex items-center flex-col p-5 bg-foreground text-background'>
        <img src="./logo-dark.svg" className='w-36' alt="Logo icon" />

        <div className={`${ralewayBold.className} flex my-5 text-sm md:text-xl`}>
            <a href="/" className='border-r-4 border-background pr-5'>Mentions Légales</a>
            <a href="/" className='pl-5'>Contact</a>
        </div>

        <div className={`${ralewayMedium.className} flex mt-5 text-sm`}>
            <a href="/" className='border-r-2 border-background pr-2'>© L’agendary</a>
            <a href="/" className='border-r-2 border-background px-2 underline'>Tous droits réservés</a>
            <a href="/" className='pl-2'>2024</a>
        </div>
    </footer>
  );
}