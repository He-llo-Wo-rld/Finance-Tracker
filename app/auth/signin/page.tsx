"use client";

import Link from "next/link";
import { ErrorMessage, Footer, GoogleSign, SignInForm } from "../components";
import { useSignIn } from "../hooks/useSignIn";

export default function SignIn() {
  const {
    formData,
    setFormData,
    loading,
    googleLoading,
    error,
    handleSubmit,
    handleGoogleSignIn,
  } = useSignIn();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          {error && <ErrorMessage error={error} />}

          <GoogleSign
            handleGoogleSignIn={handleGoogleSignIn}
            googleLoading={googleLoading}
          />

          <SignInForm
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
            loading={loading}
          />

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
