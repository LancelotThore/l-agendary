import { Raleway } from 'next/font/google';
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import Link from 'next/link'

const ralewaySemBold = Raleway({
  subsets: ['latin'],
  weight: '600',
  variable: '--font-raleway',
});

const ralewayMedium = Raleway({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-raleway',
});

export default function RegisterPage() {
  let inputs = [
    {
      id: 'name',
      name: 'Nom',
      type: 'text'
    },
    {
      id: 'firstname',
      name: 'Prénom',
      type: 'text'
    },
    {
      id: 'email',
      name: 'Email',
      type: 'email'
    },
    {
      id: 'password',
      name: 'Mot de passe',
      type: 'password'
    },
  ]
  return (
    <div className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}>
        <Link href="/">
      <img className='w-24 md:w-40' src="./logo2.svg" alt="Logo Icon" />
      </Link>

      <form action="" method='POST' className='flex justify-center items-center flex-col w-9/12 shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:w-2/4 md:p-6'>
        <h2 className={`${ralewaySemBold.className} text-base md:text-3xl w-full text-start md:text-center`}>Créer un compte</h2>

        <div className='w-full lg:w-96'>
          {inputs.map((input)=>(
            <div className='mt-3 flex flex-col gap-1'>
              <label className='text-xs md:text-base' htmlFor={input.id}>{input.name}</label>
              <Input id={input.id} placeholder={input.name} type={input.type} className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base' />
            </div>
          ))}
          
          <div className='flex justify-center flex-col'>
            <Button size="sm" className="mt-4 mx-auto">Créer son compte</Button>
              <a className='text-center mt-3 hover:underline hover:underline-offset-2 transition-transform md:text-sm' href="/login">Déjà un compte ? Se connecter</a>
          </div>
        </div>
      </form>
    </div>
  );
}