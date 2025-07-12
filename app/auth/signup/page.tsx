"use client";

import Logo from "@/components/Logo";
import Link from "next/link";

import { ErrorMessage, GoogleSignUp, SignUpForm } from "../components";
import { useSignUp } from "../hooks/useSignUp";

export default function SignUpPage() {
  const {
    formData,
    setFormData,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    loading,
    error,
    handleSubmit,
    handleGoogleSignUp,
  } = useSignUp();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center">
            <Logo size={48} className="" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-xl">
          {error && <ErrorMessage error={error} />}

          <GoogleSignUp
            handleGoogleSignUp={handleGoogleSignUp}
            loading={loading}
          />

          <SignUpForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
