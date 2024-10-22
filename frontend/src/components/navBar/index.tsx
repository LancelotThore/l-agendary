"use client";

import { useState } from 'react';
import { Logo, Search, MenuBurger, Home, Close, Profil, Calendar } from "../ui/icons";
import { Button } from '../ui/button';
import Link from 'next/link';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-secondary text-primary shadow-md">
            <div className="flex items-center justify-between mx-auto py-4 w-10/12 m-auto">
                <div className="flex items-center space-x-10">
                    <Link href="/" className="flex items-center">
                        <Logo className="w-40" />
                    </Link>
                    {isUserLoggedIn ? (
                        <>
                            <Link href="/event" className="hidden md:flex items-center space-x-2 block py-2 px-3 rounded hover:bg-background font-medium text-base">
                                <span>Mes événements</span>
                                <Calendar className="w-5" aria-hidden="true" />
                            </Link>
                            <Link
                                href="/search"
                                className="hidden md:flex items-center space-x-2 block py-2 px-3 rounded hover:bg-background font-medium text-base"
                            >
                                <span>Rechercher</span>
                                <Search className="w-5" aria-hidden="true" />
                            </Link>
                        </>
                    ) : (
                        <Link
                            href="/search"
                            className="hidden md:flex items-center space-x-2 block py-2 px-3 rounded hover:bg-background font-medium text-base"
                        >
                            <span>Rechercher</span>
                            <Search className="w-5" aria-hidden="true" />
                        </Link>
                    )}
                </div>
                <div className="hidden md:flex space-x-4 items-center">
                    {isUserLoggedIn ? (
                        <>
                            <Link href="/profile" className="hidden md:flex items-center space-x-2 block py-2 px-3 rounded hover:bg-background font-medium text-base">
                                <span>Profil</span>
                                <Profil className="w-8" aria-hidden="true" />
                            </Link>
                            <Button className="hover:bg-primary/70" onClick={() => setIsUserLoggedIn(false)}>Se déconnecter</Button>
                        </>
                    ) : (
                        <>
                            <Link href="/register">
                                <Button className="hover:bg-primary/70">S'enregistrer</Button>
                            </Link>
                            <Link href="/login">
                                <Button className="hover:bg-primary/70">Se connecter</Button>
                            </Link>
                        </>
                    )}
                </div>
                <button
                    type="button"
                    className="inline-flex items-center p-2 justify-center text-sm text-primary rounded-lg md:hidden transition-all duration-300"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <Close className="w-8" /> : <MenuBurger className="w-8" />}
                </button>
            </div>
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-mobile">
                <div className="font-medium flex flex-col py-4 rounded-lg bg-secondary items-end w-10/12 m-auto">
                    <div>
                        <Link
                            href="/"
                            className="flex items-center space-x-2 rtl:space-x-reverse block py-1 px-3 rounded font-medium text-xl"
                        >
                            <span>Accueil</span>
                            <Home className="w-5" aria-hidden="true" />
                        </Link>
                    </div>
                    <div>
                        {isUserLoggedIn ? (
                            <>
                                <Link href="/event" className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded hover:bg-background font-medium text-xl">
                                    <span>Mes événements</span>
                                    <Calendar className="w-5" aria-hidden="true" />
                                </Link>
                                <Link href="/search" className="flex items-center space-x-2 rtl:space-x-reverse block py-1 px-3 rounded font-medium text-xl">
                                    <span>Rechercher</span>
                                    <Search className="w-5" aria-hidden="true" />
                                </Link>
                
                            </>
                        ) : (
                            <Link
                                href="/search"
                                className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded hover:bg-background font-medium text-xl"
                            >
                                <span>Rechercher</span>
                                <Search className="w-5" aria-hidden="true" />
                            </Link>
                        )}
                    </div>
                    {isUserLoggedIn ? (
                        <>
                            <div>
                                <Link href="/profile" className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded hover:bg-background font-medium text-xl">
                                    <span>Profil</span>
                                    <Profil className="w-8" aria-hidden="true" />
                                </Link>
                            </div>
                            <div>
                                <Button className="mt-2" onClick={() => setIsUserLoggedIn(false)}>Se déconnecter</Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <Link
                                    href="/register"
                                    className="flex items-center block px-3 py-1 rounded font-medium"
                                >
                                    <Button className="mt-2">S'enregistrer</Button>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    href="/login"
                                    className="flex items-center block px-3 py-1 rounded font-medium"
                                >
                                    <Button className="mt-2">Se connecter</Button>
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}