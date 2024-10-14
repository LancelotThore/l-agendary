"use client";

import { useState } from 'react';
import { Logo, Search, Calendar, Profil, MenuBurger } from "../ui/icons";
import { Button } from '../ui/button';

let links = [
    { icon: Search, name: 'Rechercher' },
    { icon: Calendar, name: 'Mes événements' },
];

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-secondary text-primary">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Logo className="w-36"></Logo>
                </a>
                <button
                    data-collapse-toggle="navbar-default"
                    type="button"
                    className="inline-flex items-center p-2 justify-center text-sm text-primary rounded-lg md:hidden"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    <MenuBurger className="w-8"></MenuBurger>
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-secondary">
                        {links.map((link) => (
                            <li key={link.name}>
                                <a
                                    href="/"
                                    className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 rounded md:border-0 md:hover:text-blue-700 md:p-0"
                                >
                                    <span>{link.name}</span>
                                    <link.icon className="w-5 h-5" aria-hidden="true" />
                                </a>
                            </li>
                        ))}
                        <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
                            <Button >S'enregistrer</Button>
                            <Button >Se connecter</Button>
                        </div>
                    </ul>
                </div>
            </div>
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-mobile">
                <ul className="font-medium flex flex-col p-4 mt-4 rounded-lg bg-secondary items-end">
                    {links.map((link) => (
                        <li key={link.name}>
                            <a
                                href="/"
                                className="flex items-center space-x-2 rtl:space-x-reverse block py-2 px-3 text-gray-900 rounded"
                            >
                                <span>{link.name}</span>
                                <link.icon className="w-5 h-5" aria-hidden="true" />
                            </a>
                        </li>
                    ))}
                    <li>
                        <Button variant="outline" className="mt-2">S'enregistrer</Button>
                    </li>
                    <li>
                        <Button variant="outline" className="mt-2">Se connecter</Button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
