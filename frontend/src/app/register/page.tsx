"use client";

import { useState } from "react";
import { Raleway } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register } from "@/app/api/login";

const ralewaySemBold = Raleway({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-raleway",
});

const ralewayMedium = Raleway({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-raleway",
});

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidator, setPasswordValidator] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== passwordValidator) {
      setErrorPassword('Les mots de passe ne correspondent pas');
      return;
    }
    setErrorPassword('');
    register(email, name, firstname, password, router).catch((err) =>
      setError(err.message)
    );
  };

  // Inputs liés aux états
  let inputs = [
    {
      id: "firstname",
      name: "Prénom",
      type: "text",
      value: firstname,
      onChange: (e) => setFirstname(e.target.value),
    },
    {
      id: "name",
      name: "Nom",
      type: "text",
      value: name,
      onChange: (e) => setName(e.target.value),
    },
    {
      id: "email",
      name: "Email",
      type: "email",
      value: email,
      onChange: (e) => setEmail(e.target.value),
    },
    {
      id: "password",
      name: "Mot de passe",
      type: "password",
      value: password,
      onChange: (e) => setPassword(e.target.value),
    },
    {
      id: "passwordValidator",
      name: "Confirmation du mot de passe",
      type: "password",
      value: passwordValidator,
      onChange: (e) => setPasswordValidator(e.target.value),
    },
  ];

  return (
    <div
      className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}
    >
      <Link href="/">
        <img className="w-24 md:w-40" src="./logo2.svg" alt="Logo Icon" />
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center flex-col w-9/12 shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:w-2/4 md:p-6"
      >
        <h2
          className={`${ralewaySemBold.className} text-base md:text-3xl w-full text-start md:text-center`}
        >
          Créer un compte
        </h2>

        <div className="w-full lg:w-96">
          {inputs.map((input) => (
            <div key={input.id} className="mt-3 flex flex-col gap-1">
              <label className="text-xs md:text-base" htmlFor={input.id}>
                {input.name}
              </label>
              <Input
                required
                id={input.id}
                placeholder={input.name}
                type={input.type}
                value={input.value} // Lier la valeur à l'état
                onChange={input.onChange} // Met à jour l'état correspondant
                className="text-xs placeholder:text-FormBorder border-FormBorder md:text-base"
              />
            </div>
          ))}
          {errorPassword && (
            <div className="text-red-500 text-center mt-4">{errorPassword}</div>
          )}

          {/* Affichage conditionnel de l'erreur */}
          {error && (
            <div className="text-red-500 text-center mt-4">{error}</div>
          )}

          <div className="flex justify-center flex-col">
            <Button size="default" className="mt-4 mx-auto">
              Créer son compte
            </Button>
            <a
              className="text-center mt-3 hover:underline hover:underline-offset-2 transition-transform md:text-sm"
              href="/login"
            >
              Déjà un compte ? Se connecter
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}
