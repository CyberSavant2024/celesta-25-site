"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import {
  FaInstagram,
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Contact info data
const CONTACT_INFO = [
  {
    icon: FaEnvelope,
    title: "celesta@iitp.ac.in",
    subtitle: null,
  },
  {
    icon: FaPhoneAlt,
    title: "Abhitesh Shukla",
    subtitle: "+91 78977 21774",
  },
  {
    icon: FaPhoneAlt,
    title: "Ananta Nanda",
    subtitle: "+91 73258 73426",
  },
  {
    icon: FaMapMarkerAlt,
    title: "Celesta Office, IIT Patna",
    subtitle: "Bihta, Patna",
  },
];

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/celestaiitp_official/",
    icon: FaInstagram,
    hoverColor: "hover:text-pink-400",
  },
  {
    href: "https://www.linkedin.com/company/celesta-iit-patna/",
    icon: FaLinkedin,
    hoverColor: "hover:text-blue-400",
  },
];

// Contact info item component
const ContactItem = memo(function ContactItem({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-4">
      <Icon className="text-white text-3xl flex-shrink-0" />
      <div className="text-white">
        <p className="text-xl">{title}</p>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  );
});

// Social link component
const SocialLink = memo(function SocialLink({ href, icon: Icon, hoverColor }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`${hoverColor} transition-colors`}
    >
      <Icon />
    </a>
  );
});

const ContactSection = memo(function ContactSection() {
  return (
    <div className="w-full max-w-lg lg:h-[73vh] lg:w-[25vw]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col gap-6 w-full py-10 px-10 md:px-6 lg:py-18 md:py-10 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-lg overflow-hidden"
      >
        {/* Contact Info */}
        {CONTACT_INFO.map((item, index) => (
          <ContactItem
            key={index}
            icon={item.icon}
            title={item.title}
            subtitle={item.subtitle}
          />
        ))}

        {/* Social Media */}
        <div className="mt-6">
          <h3 className="text-2xl font-medium text-white mb-4">
            Follow Us on Social Media
          </h3>
          <div className="flex gap-6 text-3xl">
            {SOCIAL_LINKS.map((link, index) => (
              <SocialLink
                key={index}
                href={link.href}
                icon={link.icon}
                hoverColor={link.hoverColor}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
});

export default ContactSection;
