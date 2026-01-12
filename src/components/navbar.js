"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl">
            <nav className="mx-4 flex items-center justify-between rounded-full bg-black/20 p-3 text-white backdrop-blur-xl border border-white/10 shadow-lg">
                <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
                    <Image
                        src="/images/celesta-icon.svg"
                        alt="Celesta Logo"
                        width={35}
                        height={35}
                    />
                    <Image
                        src="/images/typeface-navbar.png"
                        alt="Celesta"
                        width={110}
                        height={35}
                        className="-translate-y-1 h-auto"
                    />
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-6 state-wide text-xs uppercase text-white">
                    <Link href="/" className="opacity-80 hover:opacity-100 transition">Home</Link>
                    <Link href="/events" className="opacity-80 hover:opacity-100 transition">Events</Link>
                    <Link href="/spons" className="opacity-80 hover:opacity-100 transition">Sponsors</Link>
                    <Link href="/workshop" className="opacity-80 hover:opacity-100 transition">Workshops</Link>
                    <Link href="/team" className="opacity-80 hover:opacity-100 transition">Team</Link>
                    <Link href="/gallery" className="opacity-80 hover:opacity-100 transition">Gallery</Link>
                    <Link href="/login" className="rounded-full border-2 border-teal-500 px-5 py-2 opacity-80 hover:opacity-100 hover:bg-teal-500 hover:text-black transition">Login</Link>
                    <Link href="/register" className="rounded-full bg-teal-500 px-5 py-2 text-black hover:bg-teal-400 transition">Register</Link>
                </div>

                {/* Mobile Hamburger Menu Button */}
                <button
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-lg animate-in slide-in-from-top-2 duration-300 text-white font-bold">
                    <div className="p-6 space-y-4 state-wide text-xs uppercase">
                        <Link href="/" className="block py-2 opacity-80 hover:opacity-100 transition" onClick={closeMenu}>Home</Link>
                        <Link href="/events" className="block py-2 opacity-80 hover:opacity-100 transition" onClick={closeMenu}>Events</Link>
                        <Link href="/spons" className="block py-2 opacity-80 hover:opacity-100 transition" onClick={closeMenu}>Sponsors</Link>
                        <Link href="/workshop" className="block py-2 opacity-80 hover:opacity-100 transition" onClick={closeMenu}>Workshops</Link>
                        <Link href="/team" className="block py-2 opacity-80 hover:opacity-100 transition" onClick={closeMenu}>Team</Link>
                        <Link href="/gallery" className="block py-2 opacity-80 hover:opacity-100 transition" onClick={closeMenu}>Gallery</Link>
                        <div className="pt-4 space-y-3">
                            <Link href="/login" className="block text-center rounded-full border-2 border-teal-500 px-5 py-2 opacity-80 hover:opacity-100 hover:bg-teal-500 hover:text-black transition" onClick={closeMenu}>Login</Link>
                            <Link href="/register" className="block text-center rounded-full bg-teal-500 px-5 py-2 text-black hover:bg-teal-400 transition" onClick={closeMenu}>Register</Link>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
}

