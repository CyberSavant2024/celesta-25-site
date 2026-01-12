"use client";
import { useEffect, useState } from "react";
import { getFirestore, collection, query, onSnapshot } from "firebase/firestore";
import { useAuth } from "@/context/AuthUserContext";

const db = getFirestore();

export function useProducts() {
  const { authUser, loading: authLoading } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Wait for auth to initialize
    if (authLoading) return;

    if (!authUser) {
      setProducts([]);
      setLoading(false);
      return;
    }

    // Query products collection
    const q = query(collection(db, "products"));

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(docs);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    );

    // Cleanup listener on unmount or when user changes
    return () => unsubscribe();
  }, [authUser, authLoading]);

  return { products, loading };
}

