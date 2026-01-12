"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useToggleMenu } from "@/hooks";
import { NAV_LINKS } from "@/lib/constants";

// Navigation link component
const NavLink = memo(function NavLink({ href, children, onClick, className = "" }) {
  return (
    <Link
      href={href}
      className={`opacity-80 hover:opacity-100 transition ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
});

// Mobile hamburger button
const HamburgerButton = memo(function HamburgerButton({ isOpen, onClick }) {
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
      onClick={onClick}
      aria-label="Toggle menu"
    >
      <span
        className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
          isOpen ? "opacity-0" : ""
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
});

const Navbar = memo(function Navbar() {
  const { isOpen, toggle, close } = useToggleMenu();

  const handleLinkClick = useCallback(() => {
    close();
  }, [close]);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-6xl">
      <nav className="mx-4 flex items-center justify-between rounded-full bg-black/20 p-3 text-white backdrop-blur-xl border border-white/10 shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" onClick={handleLinkClick}>
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
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              className={link.className || ""}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger Menu Button */}
        <HamburgerButton isOpen={isOpen} onClick={toggle} />
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 rounded-2xl bg-black/30 backdrop-blur-xl border border-white/10 shadow-lg animate-in slide-in-from-top-2 duration-300 text-white font-bold">
          <div className="p-6 space-y-4 state-wide text-xs uppercase">
            {NAV_LINKS.filter((link) => !link.isButton).map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="block py-2"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 space-y-3">
              {NAV_LINKS.filter((link) => link.isButton).map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`block text-center ${link.className || ""}`}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
});

export default Navbar;

