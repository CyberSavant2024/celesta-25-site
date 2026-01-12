"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthUserContext";
import { useProducts } from "@/hooks/useProducts";
import { LoadingPage } from "@/components/ui";
import ProductCard from "./product-card";
import styles from "./Store.module.css";

export default function Store() {
  const { authUser, loading } = useAuth();
  const router = useRouter();
  const { products } = useProducts();

  // Redirect unauthenticated users
  useEffect(() => {
    if (!loading && !authUser) {
      router.replace("/register");
    }
  }, [authUser, loading, router]);

  // Memoize products list
  const productsList = useMemo(() => products, [products]);

  if (loading) {
    return <LoadingPage message="Loading store..." />;
  }

  if (!authUser) {
    return <LoadingPage message="Redirecting..." />;
  }

  return (
    <div
      className={`bg-muted flex flex-col min-h-svh gap-8 items-left justify-center p-2 md:p-10 ${styles.background} text-white`}
    >
      <h1 className="race font-bold text-5xl text-grad mt-[15vh]">Store</h1>
      <div className="flex items-center justify-center flex-wrap gap-2 md:gap-8">
        {productsList.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            cost={product.cost}
            id={product.id}
            img_src={product.img_src}
          />
        ))}
      </div>
    </div>
  );
}
