import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gestion des projets - Admin",
  description: "Interface d'administration pour gérer les projets du portfolio"
};

export default function ProjectsLayout({children}: { children: React.ReactNode; }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}

