"use client";

import {
  BenefitsSection,
  CTASection,
  DemoSection,
  FeaturesSection,
  HeroSection,
  PublicNavbar,
} from "@/components";

import { useSession } from "next-auth/react";
import { Loading } from "./analytics/components";

export default function HomePage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Loading />;

  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <HeroSection session={session} />

        <FeaturesSection />

        <DemoSection />

        <BenefitsSection />

        <CTASection session={session} />
      </div>
    </>
  );
}
