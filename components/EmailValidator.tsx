// Utility component for real-time email validation
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

    // Check format first
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailToCheck)) {
      onValidationChange(false, "Невірний формат email");
      return;
    }

    setIsChecking(true);

    try {
      // Check if email exists in database
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
        onValidationChange(true, ""); // If check fails, allow user to proceed
      }
    } catch (error) {
      onValidationChange(true, ""); // If check fails, allow user to proceed
    } finally {
      setIsChecking(false);
    }
  };

  // Debounced validation
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
