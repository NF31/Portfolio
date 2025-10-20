import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Gestion des compétences - Admin",
  description: "Interface d'administration pour gérer les compétences techniques",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SkillsLayout({
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
