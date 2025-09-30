import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Modifier un projet - Admin",
  description: "Interface d'administration pour modifier un projet existant du portfolio"
};

export default function EditProjectLayout({children}: { children: React.ReactNode; }) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}
