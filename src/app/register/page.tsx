import Image from "next/image";
import { Raleway } from 'next/font/google';
import RegisterLayout from './layout';

const raleway = Raleway({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-raleway',
})

export default function RegisterPage() {
  return (
    <RegisterLayout>
      <h1>Page de Registration</h1>
      {/* Votre contenu de page ici */}
    </RegisterLayout>
  );
}
