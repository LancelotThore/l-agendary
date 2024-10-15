"use client";

import { useState } from 'react';
import { Logo, Search, MenuBurger, Home, Close } from "../ui/icons";
import { Button } from '../ui/button';

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-secondary text-primary">
            <div className="flex items-center justify-between mx-auto p-6 shadow-md">
                <div className="flex items-center space-x-10 rtl:space-x-reverse">
                    <a href="/" className="flex items-center">
                        <Logo className="w-40" />
                    </a>
                    <a
                        href="/"
                        className="hidden md:flex items-center space-x-2 block py-2 px-3 rounded hover:bg-background font-medium text-base"
                    >
                        <span>Rechercher</span>
                        <Search className="w-5 h-5" aria-hidden="true" />
                    </a>
                </div>
                <button
                    type="button"
                    className="inline-flex items-center p-2 justify-center text-sm text-primary rounded-lg md:hidden transition-all duration-300"
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <Close className="w-8" /> : <MenuBurger className="w-8" />}
                </button>
                <div className="hidden md:block" id="navbar-default">
                    <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:mt-0 md:border-0 md:bg-secondary">
                        <div className="hidden md:flex items-center">
                            <a
                                href="/signup"
                                className="flex items-center block py-2 px-3 rounded font-medium"
                            >
                                <Button className="mt-2 hover:bg-primary/70">S'enregistrer</Button>
                            </a>
                            <a
                                href="/login"
                                className="flex items-center block py-2 px-3 rounded font-medium"
                            >
                                <Button className="mt-2 hover:bg-primary/70">Se connecter</Button>
                            </a>
                        </div>
                    </ul>
                </div>
            </div>
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-mobile">
                <ul className="font-medium flex flex-col p-4 rounded-lg bg-secondary items-end">
                    <li>
                        <a
                            href="/"
                            className="flex items-center space-x-2 rtl:space-x-reverse block py-1 px-3 rounded font-medium text-xl"
                        >
                            <span>Accueil</span>
                            <Home className="w-5 h-5" aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="/"
                            className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded font-medium text-xl"
                        >
                            <span>Rechercher</span>
                            <Search className="w-5 h-5" aria-hidden="true" />
                        </a>
                    </li>
                    <li>
                        <a
                            href="/signup"
                            className="flex items-center block px-3 py-1 rounded font-medium"
                        >
                            <Button className="mt-2">S'enregistrer</Button>
                        </a>
                    </li>
                    <li>
                        <a
                            href="/login"
                            className="flex items-center block px-3 py-1 rounded font-medium"
                        >
                            <Button className="mt-2">Se connecter</Button>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
