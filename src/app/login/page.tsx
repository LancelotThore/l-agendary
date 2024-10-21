import { Raleway } from 'next/font/google';
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

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

export default function LoginPage() {
  let inputs = [
    {
      id: 'email',
      name: 'Email',
      type: 'email'
    },
    {
      id: 'password',
      name: 'Mot de passe',
      type: 'password'
    }
  ]
  return (
    <div className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}>
      <img className='w-24 md:w-40' src="./logo2.svg" alt="Logo Icon" />

      <form action="" method='POST' className='flex justify-center items-center flex-col w-9/12 shadow-md mt-5 p-4 border border-FormBorder rounded-md md:w-2/4 md:p-6'>
        <h2 className={`${ralewaySemBold.className} text-base md:text-3xl md:text-center`}>Se connecter</h2>
        {/* <p className='text-xs md:text-base'>Rentrez votre mail pour que nous puissions vous envoyer un email de récupération.</p> */}

        <div className='w-full lg:w-96'>
          {inputs.map((input)=>(
            <div className='mt-3 flex flex-col gap-1'>
              <label className='text-xs md:text-base' htmlFor={input.id}>{input.name}</label>
              <Input id={input.id} placeholder={input.name} type={input.type} className='text-xs placeholder:text-FormBorder border-FormBorder md:text-base' />
              {input.id === 'password' ? (
                <>
                  <a href="/recover/account" className='text-cardDate text-sm	text-right hover:underline hover:underline-offset-2 transition-transform'>Mot de passe oublié</a>
                </>
              ) : ''}
            </div>
          ))}
          
          <div className='flex justify-center flex-col'>
            <Button size="sm" className="mt-4 mx-auto">Se connecter</Button>
          </div>
        </div>
      </form>
    </div>
  );
}