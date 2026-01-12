/**
 * Static data constants for the Celesta website
 * Centralizes data that doesn't change frequently
 */

// Past performers for the homepage slideshow
export const PERFORMERS = [
  {
    images: [
      "/images/artists/irfan_1.jpg",
      "/images/artists/irfan_2.jpg",
      "/images/artists/irfan_3.jpg",
    ],
    name: "Mohammed Irfan",
  },
  {
    images: [
      "/images/artists/bassi_1.jpg",
      "/images/artists/bassi_2.webp",
      "/images/artists/bassi_3.webp",
    ],
    name: "Anubhav Singh Bassi",
  },
  {
    images: [
      "/images/artists/kapoor_1.png",
      "/images/artists/kapoor_2.png",
      "/images/artists/kapoor_3.jpg",
    ],
    name: "Gaurav Kapoor",
  },
  {
    images: [
      "/images/artists/artist4-1.jpg",
      "/images/artists/artist4-2.jpg",
      "/images/artists/artist4-3.jpg",
    ],
    name: "Aaditya Kulshreshth",
  },
];

// Navigation links
export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/spons", label: "Sponsors" },
  { href: "/workshop", label: "Workshops" },
  { href: "/team", label: "Team" },
  { href: "/gallery", label: "Gallery" },
  { 
    href: "/login", 
    label: "Login", 
    isButton: true,
    className: "rounded-full border-2 border-teal-500 px-5 py-2 hover:bg-teal-500 hover:text-black",
  },
  { 
    href: "/register", 
    label: "Register", 
    isButton: true,
    className: "rounded-full bg-teal-500 px-5 py-2 text-black hover:bg-teal-400",
  },
];

// Social media links
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/celestaiitp_official/",
  linkedin: "https://www.linkedin.com/company/celesta-iit-patna/",
};

// Theme content for the homepage
export const THEME_CONTENT = {
  title: "Reclaiming the Realms",
  paragraphs: [
    `"Reclaim" is a word rooted in Latin "reclamare" – to call back, to demand the return of what was lost. In this context, "reclaim" is not merely about retrieval, but returning and usage of lost wisdom by it's rightful owners.`,
    `"Realms" denote sovereign territories, representing technology's 5 sovereign domains; energy, memory, connection, creation, and logic. Here, they are represented by the realms of fire, water, air, earth, and aether, respectively.`,
    `This theme frames technology as a combination of elements that are to be reclaimed and reunited. Returning each realm to its rightful owner, and stripping the power away from whom it does not belong to.`,
  ],
  highlights: [
    {
      title: "Restoration of knowledge",
      description: "Restoring ancient wisdom, applying it to our understanding of technology.",
    },
    {
      title: "Reuniting of Elements",
      description: "Reclaiming the realms under one person, and viewing the wholeness of technology comprised by those elements.",
    },
  ],
};

// Animation configurations
export const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { autoAlpha: 0, y: 100 },
    animate: { autoAlpha: 1, y: 0 },
    duration: 1,
    ease: "power3.out",
  },
  slideIn: {
    duration: 1.2,
    ease: "power3.out",
  },
  spring: {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  },
};

// Swiper default configuration
export const SWIPER_CONFIG = {
  spaceBetween: 24,
  slidesPerView: 1,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
  centeredSlides: true,
  loop: true,
  grabCursor: true,
};

// Form validation patterns
export const VALIDATION_PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  iitpEmail: /@iitp\.ac\.in$/,
  password: /^.{6,}$/, // Minimum 6 characters
};

// OTP configuration
export const OTP_CONFIG = {
  length: 6,
  resendTimeout: 30, // seconds
};
