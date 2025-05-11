import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Segmentation Analysis | Mindscape Analytics",
  description: "Analyze user behavior and segment your audience for targeted engagement strategies",
};

export default function SegmentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col min-h-screen bg-background">
      <div className="flex-1">
        {children}
      </div>
    </section>
  );
} 