"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthUserContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { checkout } from "@/lib/checkout";
import { useToggleMenu } from "@/hooks";
import { FloatingButton, DropdownMenu, MenuItem } from "@/components/ui";

export default function FloatingCart() {
  const { cart, cartTotal, emptyCart } = useCart();
  const { authUser } = useAuth();
  const { isOpen, toggle, close, ref } = useToggleMenu();

  const handleCheckout = async () => {
    close();
    await checkout(cart, authUser);
    emptyCart();
  };

  return (
    <div ref={ref} className="fixed top-48 right-4 sm:right-8 z-50 group">
      <FloatingButton onClick={toggle} ariaLabel="Toggle cart menu">
        <ShoppingCart size={30} />
      </FloatingButton>

      <DropdownMenu isOpen={isOpen}>
        <nav className="flex flex-col space-y-1">
          <MenuItem href="/store" onClick={close}>
            Store
          </MenuItem>

          {cart.length === 0 ? (
            <p className="text-white/70 text-sm px-4">Your cart is empty.</p>
          ) : (
            <div>
              <hr className="my-2 opacity-20" />
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="px-4 py-2 text-white rounded-md transition-colors flex gap-2"
                >
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>Rs.{item.cost * item.quantity}</span>
                </div>
              ))}
              <hr className="my-2 opacity-20" />
              <div className="px-4 py-2 text-white rounded-md transition-colors text-left flex gap-2">
                <span>Total</span>
                <span>Rs. {cartTotal}</span>
              </div>
            </div>
          )}

          <MenuItem onClick={handleCheckout}>Check Out</MenuItem>
        </nav>
      </DropdownMenu>
    </div>
  );
}

