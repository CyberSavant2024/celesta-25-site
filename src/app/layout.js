import { AuthUserProvider } from "@/context/AuthUserContext";
import { CartProvider } from "@/context/CartContext";
import "./globals.css";
import Navbar from "@/components/navbar";
import FloatingNav from "@/components/floatnav";
import FloatingCart from "@/components/floatcart";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/footer";
import Cart from "@/components/Cart";

export const metadata = {
  title: "Celesta 2025 - IIT Patna's Annual Tech Fest",
  description: "Join us at Celesta 2025, the annual technical festival of IIT Patna featuring robotics, coding, workshops and celebrity performances.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome for LinkedIn + Twitter(X) icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body>
        <AuthUserProvider>
          <CartProvider>
            <Navbar/>
            <FloatingNav />
            <FloatingCart />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
            <Footer />
          </CartProvider>
        </AuthUserProvider>
      </body>
    </html>
  );
}
