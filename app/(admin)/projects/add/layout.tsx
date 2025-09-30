import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ajouter un projet - Admin",
  description: "Interface d'administration pour ajouter un nouveau projet au portfolio"
};

export default function AddProjectLayout({children}: { children: React.ReactNode; }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
