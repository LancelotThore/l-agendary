import { Button } from "@/components/ui/button";
import { LockClosedIcon, Search } from "@/components/ui/icons";
import { Agbalumo, Raleway } from 'next/font/google';

const agbalumo = Agbalumo({
  subsets: ['latin'],
  variable: '--font-test',
  weight: '400',
})
const raleway = Raleway({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-raleway',
})

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-background">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

      </main>
    </div>
  );
}
