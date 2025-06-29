import Image from "next/image";
import { useState } from "react";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 32, className = "" }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    
    return <LogoSVG size={size} className={className} />;
  }

  return (
    <Image
      src="/logo.png"
      alt="Finance Tracker Logo"
      width={size}
      height={size}
      className={`rounded-lg ${className}`}
      priority
      onError={() => setImageError(true)}
    />
  );
}

// Варіант для favicon - квадратна іконка
export function LogoIcon({ size = 24, className = "" }: LogoProps) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <LogoSVG size={size} className={className} />;
  }

  return (
    <Image
      src="/favicon-32x32.png"
      alt="Finance Tracker Icon"
      width={size}
      height={size}
      className={className}
      priority
      onError={() => setImageError(true)}
    />
  );
}

// Fallback SVG якщо зображення не завантажується
export function LogoSVG({ size = 32, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="16" cy="16" r="16" fill="#2563eb" />
      <path
        d="M6 26h20M6 26V6"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="9" y="18" width="3" height="8" fill="white" rx="1" />
      <rect x="13" y="14" width="3" height="12" fill="white" rx="1" />
      <rect x="17" y="12" width="3" height="14" fill="white" rx="1" />
      <rect x="21" y="16" width="3" height="10" fill="white" rx="1" />
      <path
        d="m13 10 3-3 3 3"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="m16 7v6"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
