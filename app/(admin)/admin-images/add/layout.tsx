import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ajouter une image - Admin",
  description: "Interface d'administration pour ajouter une nouvelle image au portfolio"
};

export default function AddImageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}