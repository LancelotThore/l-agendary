import { Raleway } from 'next/font/google';
import { Input } from "@/components/ui/input";

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
    },
    {
      id: 'firstname',
      name: 'Prénom',
    },
    {
      id: 'email',
      name: 'Email',
    },
    {
      id: 'password',
      name: 'Mot de passe',
    },
  ]
  return (
    <div className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}>
      <img className='w-24' src="./logo2.svg" alt="Logo Icon" />

      <section className='w-9/12 shadow-md mt-5 p-4 border border-cardDate rounded-md'>
        <h2 className={`${ralewaySemBold.className} text-base`}>Créer un compte</h2>

        {inputs.map((input)=>(
          <div className='mt-3 flex flex-col gap-1'>
            <label htmlFor={input.id}>{input.name}</label>
            <Input id={input.id} placeholder={input.name} className='text-xs text-cardDate' />
          </div>
        ))}

      </section>
    </div>
  );
}