"use client";

import { memo, useCallback, useMemo } from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const ProductCard = memo(function ProductCard({ name, cost, img_src, id }) {
  const { cart, addToCart, removeFromCart } = useCart();

  // Get quantity from cart
  const quantity = useMemo(() => {
    const product = cart.find((item) => item.id === id);
    return product ? product.quantity : 0;
  }, [cart, id]);

  // Handler to add item to cart
  const handleAddToCart = useCallback(() => {
    addToCart({ name, cost, img_src, id });
  }, [addToCart, name, cost, img_src, id]);

  // Handler to remove item from cart
  const handleRemoveFromCart = useCallback(() => {
    removeFromCart(id);
  }, [removeFromCart, id]);

  return (
    <div className="p-4 rounded-xl w-[28rem] transition hover:scale-105 shadow-xl flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-[32rem] overflow-hidden rounded-xl">
        <Image
          src={img_src}
          alt={name}
          fill
          className="object-cover brightness-50"
          sizes="(max-width: 768px) 100vw, 28rem"
        />

        {/* Overlay Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h1 className="text-white uppercase text-4xl font-extrabold">
            {name}
          </h1>
          <h2 className="text-white uppercase text-2xl font-medium">
            Rs.{cost}
          </h2>

          {quantity > 0 ? (
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleRemoveFromCart}
                className="px-2 py-1 rounded-md border-2 border-white hover:bg-white hover:text-gray-800 transition uppercase tracking-[2px] text-md"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="text-white text-xl">{quantity}</span>
              <button
                onClick={handleAddToCart}
                className="px-2 py-1 rounded-md border-2 border-white hover:bg-white hover:text-gray-800 transition uppercase tracking-[2px] text-md"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-2 py-1 mt-4 rounded-md border-2 border-white hover:bg-white hover:text-gray-800 transition uppercase tracking-[2px] text-md"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = "ProductCard";

export default ProductCard;
