"use client";

import { useState } from "react";

interface EmailValidatorProps {
  email: string;
  onValidationChange: (isValid: boolean, message: string) => void;
}

export default function EmailValidator({
  email,
  onValidationChange,
}: EmailValidatorProps) {
  const [isChecking, setIsChecking] = useState(false);

  const validateEmail = async (emailToCheck: string) => {
    if (!emailToCheck) {
      onValidationChange(false, "");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToCheck)) {
      onValidationChange(false, "Невірний формат email");
      return;
    }

    setIsChecking(true);

    try {
      const response = await fetch("/api/auth/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailToCheck.toLowerCase().trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        onValidationChange(
          !data.exists,
          data.exists ? "Email вже використовується" : "Email доступний"
        );
      } else {
        onValidationChange(true, "");
      }
    } catch (error) {
      onValidationChange(true, "");
    } finally {
      setIsChecking(false);
    }
  };

  useState(() => {
    const timer = setTimeout(() => {
      if (email) {
        validateEmail(email);
      }
    }, 500);

    return () => clearTimeout(timer);
  });

  if (isChecking) {
    return <span className="text-sm text-gray-500">Перевірка email...</span>;
  }

  return null;
}
