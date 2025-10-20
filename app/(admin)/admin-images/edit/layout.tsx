import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Modifier une image - Admin",
  description: "Interface d'administration pour modifier une image existante",
  robots: { index: false, follow: false },
};

export default function EditImageLayout({
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
