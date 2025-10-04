import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gestion des images - Admin",
  description: "Interface d'administration pour gérer les images du portfolio"
};

export default function ImagesLayout({
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