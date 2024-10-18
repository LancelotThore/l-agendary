import Image from "next/image";
import { Raleway } from 'next/font/google';

const raleway = Raleway({
  subsets: ['latin'],
  weight: '900',
  variable: '--font-raleway',
})

export default function Home() {
  return (
    <div className="bg-background">

      <img src="./logo" alt="" />
      <form action="post">

      </form>
    </div>
  );
}
