import type { Metadata, Viewport } from "next";
import ClientLayout from "./client-layout";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http://localhost:3000"),
  title: "Finance Tracker - Personal Finance Management",
  description:
    "Track your income and expenses with ease. Comprehensive analytics and insights for better financial decisions.",
  keywords: [
    "finance",
    "budgeting",
    "expense tracker",
    "personal finance",
    "money management",
  ],
  authors: [{ name: "Finance Tracker Team" }],
  creator: "Finance Tracker",
  publisher: "Finance Tracker",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    title: "Finance Tracker - Personal Finance Management",
    description: "Track your income and expenses with comprehensive analytics",
    siteName: "Finance Tracker",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finance Tracker",
    description: "Personal finance management made simple",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Finance Tracker" />
      </head>
      <body className="bg-gray-50 min-h-screen flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
