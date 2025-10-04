import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ajouter une compétence - Admin",
  description: "Interface d'administration pour ajouter une nouvelle compétence technique"
};

export default function AddSkillLayout({
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
