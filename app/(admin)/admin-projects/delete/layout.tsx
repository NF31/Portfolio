import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Supprimer un projet - Admin",
  description: "Interface d'administration pour supprimer un projet du portfolio"
};

export default function DeleteProjectLayout({children}: { children: React.ReactNode; }) {
  return (
    <div className="p-6">
      {children}
    </div>
  );
}
