import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Formation - Admin",
  description: "Interface d'administration pour gérer les formations et certifications"
};

export default function EducationLayout({
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
