"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "../context/CartContext";

const ClientProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  );
};

export default ClientProviders;
