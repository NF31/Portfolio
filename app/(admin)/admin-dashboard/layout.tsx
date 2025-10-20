import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard Admin - Portfolio",
  description: "Tableau de bord d'administration pour gérer le portfolio",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardLayout({
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
