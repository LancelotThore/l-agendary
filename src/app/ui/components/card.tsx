import { twMerge } from "tailwind-merge";
import { Raleway } from 'next/font/google';

const ralewayBold = Raleway({
    subsets: ['latin'],
    weight: ['900'],
    variable: '--font-raleway',
});

const ralewayMedium = Raleway({
    subsets: ['latin'],
    weight: ['400'],
    variable: '--font-raleway',
});

const baseClasses = "rounded-md font-medium focus:outline-none";

const variantsLookup = {
  event: "bg-[#9EB8D1] text-[#0A131B]",
  profil: "bg-[#3E5872] text-[#688BAD]",
};

const sizesLookup = {
  small: "px-3 py-1.5 text-sm focus:ring-2 focus:ring-offset-1",
  medium: "px-5 py-3 focus:ring-2 focus:ring-offset-2",
  large: "px-6 py-3 text-lg focus:ring focus:ring-offset-2",
  xLarge: "px-8 py-4 text-lg focus:ring focus:ring-offset-2",
};

interface CardProps {
  variant?: "event" | "profil";
  size?: "small" | "medium" | "large" | "xLarge";
  className?: string;
  title: string;
  description: string;
  img: string;
  id: number;
}

export function Card({ variant = "event", size = "medium", className, title, description, img, id, ...rest }: CardProps) {
  return (
    <li
      {...rest}
      key={id}
      className={twMerge(baseClasses, variantsLookup[variant], sizesLookup[size], className)}
    >
      <div className='w-full flex gap-6 flex-col'>
        <h2 className={`${ralewayBold.className} text-base md:text-2xl`}>{title}</h2>
        <p className={`${ralewayMedium.className} hidden md:block`}>{description}</p>
      </div>
      <img className='relative h-min w-11 h-11 md:w-36 md:h-36' src={img} alt="card img" />
    </li>
  );
}