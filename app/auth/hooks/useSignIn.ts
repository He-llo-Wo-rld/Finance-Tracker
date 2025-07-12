import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export function useSignIn() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("Sign in error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError("");

    try {
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      setError("Google sign in error");
      setGoogleLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    loading,
    googleLoading,
    error,
    handleSubmit,
    handleGoogleSignIn,
  };
}