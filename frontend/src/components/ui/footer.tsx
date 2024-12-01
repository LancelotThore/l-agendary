import { Raleway } from "next/font/google";
import { LogoReverse } from "@/components/ui/logos";
import Link from "next/link";

const ralewayBold = Raleway({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-raleway",
});

const ralewayMedium = Raleway({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-raleway",
});

export function Footer() {
  return (
    <footer className="flex items-center flex-col p-5 bg-foreground text-background">
      <LogoReverse className="w-40" />

      <div className={`${ralewayBold.className} flex my-5 text-sm md:text-xl`}>
        <Link href="/" className="border-r-4 border-background pr-5">
          Mentions Légales
        </Link>
        <Link href="/" className="pl-5">
          Contact
        </Link>
      </div>

      <div className={`${ralewayMedium.className} flex mt-5 text-sm`}>
        <Link href="/" className="border-r-2 border-background pr-2">
          © L’agendary
        </Link>
        <Link href="/" className="border-r-2 border-background px-2 underline">
          Tous droits réservés
        </Link>
        <Link href="/" className="pl-2">
          2024
        </Link>
      </div>
    </footer>
  );
}
