import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Modifier une compétence - Admin",
  description: "Interface d'administration pour modifier une compétence existante"
};

export default function EditSkillLayout({
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
