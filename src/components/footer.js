"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

// Social link component
const SocialLink = memo(function SocialLink({ href, icon: Icon, label }) {
  return (
    <Link href={href} target="_blank" rel="noreferrer">
      <span className="flex items-center gap-2 text-xl justify-center md:justify-end hover:text-teal-400 transition-colors">
        <Icon /> {label}
      </span>
    </Link>
  );
});

const Footer = memo(function Footer() {
  return (
    <footer className="relative z-50 w-full bg-black text-white px-6 md:px-24 py-8 md:py-16 flex flex-col md:flex-row items-center md:items-center md:justify-between gap-8">
      {/* Logo */}
      <div className="flex justify-center md:justify-start w-full md:w-auto">
        <Image
          src="/images/banner-logo.png"
          alt="Celesta IIT Patna"
          width={400}
          height={600}
          className="object-contain"
        />
      </div>

      {/* Social Links */}
      <div className="flex flex-col justify-center items-center md:items-end gap-4 text-center md:text-right">
        <SocialLink
          href={SOCIAL_LINKS.instagram}
          icon={Instagram}
          label="celestaiitp_official"
        />
        <SocialLink
          href={SOCIAL_LINKS.linkedin}
          icon={Linkedin}
          label="celesta-iit-patna"
        />
      </div>
    </footer>
  );
});

export default Footer;
