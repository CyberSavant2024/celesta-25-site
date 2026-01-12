"use client";

import { memo } from "react";
import { useCart } from "@/context/CartContext";

// Cart item component
const CartItem = memo(function CartItem({ name, quantity, cost }) {
  const itemTotal = cost * quantity;
  return (
    <div className="flex justify-between mb-2">
      <span>
        {name} (x{quantity})
      </span>
      <span>Rs.{itemTotal}</span>
    </div>
  );
});

const Cart = memo(function Cart() {
  const { cart, cartTotal } = useCart();

  return (
    <div className="fixed top-20 right-4 bg-white p-4 rounded-lg shadow-lg text-black">
      <h2 className="text-xl font-bold mb-4">Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              cost={item.cost}
            />
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>Rs.{cartTotal}</span>
          </div>
        </div>
      )}
    </div>
  );
});

export default Cart;
