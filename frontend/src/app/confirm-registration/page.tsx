"use client";

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ConfirmRegistration() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            // Rediriger vers une autre page si le token n'est pas présent
            router.replace('/');
        }
    }, [searchParams, router]);

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className="text-base font-semibold text-center md:text-2xl">Inscription à l'évenement NAME</h1>
            <Button>Confirmer l'inscription</Button>
        </div>
    )
}