"use client"; // obligatoire pour utiliser useEffect et router

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/pagePrincipale"); // redirige vers ta vraie page
  }, [router]);

  return null; // ou un <Loader /> si tu veux
}
