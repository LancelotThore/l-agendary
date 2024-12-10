"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Raleway } from "next/font/google";
import { Input } from "../../components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { resetPassword } from "@/lib/login";


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


export default function Page() {
    const [password, setPassword] = useState("");
    const [passwordVerify, setPasswordVerify] = useState("");
    const [error, setError] = useState("");
    const [spinnerActive, setSpinnerActive] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isValidToken, setIsValidToken] = useState(false);

    const validateToken = async (token: string) => {
        try {
            const response = await fetch(`https://localhost:443/api/password/validate-token?token=${token}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }
            );
            if (!response.ok) {
                setIsValidToken(false);
            } else {
                setIsValidToken(true);
            }
        }
        catch (error) {
            setIsValidToken(false);
        }
    };

    useEffect(() => {
        const token = searchParams.get('token');

        // if (!token) {
        //     return;
        // }
        validateToken(token);

    }, [searchParams, router]);




    const handleSubmit = async (e) => {
        e.preventDefault();


        if (password !== passwordVerify) {
            setError("Les mots de passe ne correspondent pas");
            return;
        }
        try {
            setSpinnerActive(true);
            await resetPassword(password, searchParams.get('token'), router);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setSpinnerActive(false);
        }
    };
    
    let inputs = [
        {
            id: "password",
            name: "Nouveau mot de passe",
            type: "password",
            value: password,
            onChange: (e) => setPassword(e.target.value),
        },
        {
            id: "passwordVerify",
            name: "Confirmation du nouveau mot de passe",
            type: "password",
            value: passwordVerify,
            onChange: (e) => setPasswordVerify(e.target.value),
        },
    ];

    if (isValidToken) {
        return (
            <div
            className={`${ralewayMedium.className} flex flex-col h-screen justify-center items-center text-xs`}
            >
            <Link href="/">
                <img className="w-24 md:w-40" src="./logo2.svg" alt="Logo Icon" />
            </Link>
    
            <form
                onSubmit={handleSubmit}
                className="flex justify-center items-center flex-col shadow-md mt-5 p-4 bg-secondary border border-FormBorder rounded-md md:p-8"
            >
                <h2
                className={`${ralewaySemBold.className} text-base md:text-3xl md:text-center`}
                >
                Réinitialisation du mot de passe
                </h2>
    
                <div className="w-full lg:w-96">
                {inputs.map((input) => (
                    <div key={input.id} className="mt-3 flex flex-col gap-1">
                    <label className="text-xs md:text-base" htmlFor={input.id}>
                        {input.name}
                    </label>
                    <Input
                        id={input.id}
                        placeholder={input.name}
                        type={input.type}
                        value={input.value}
                        onChange={input.onChange} // Gère les changements
                        className="text-xs placeholder:text-FormBorder border-FormBorder md:text-base"
                    />
                    </div>
                ))}
    
                {/* Afficher un message d'erreur si nécessaire */}
                {error && (
                    <div className="text-red-500 text-center mt-4">{error}</div>
                )}
    
                <div className="flex justify-center flex-col">
                    <Button size="default" className="mt-4 mx-auto">
                    <Image width={5} height={5} className={`animate-spin h-5 w-5 mr-3 ${spinnerActive ? '' : 'hidden'}`} src="./spinner.svg" alt="Spiner svg" />
                    Modifier le mot de passe
                    </Button>
                </div>
                </div>
            </form>
            </div>
        );
    }

}
