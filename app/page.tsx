"use client";

import DemoAnalytics from "@/components/DemoAnalytics";
import PublicNavbar from "@/components/PublicNavbar";
import {
  BarChart3,
  Calculator,
  PieChart,
  Shield,
  Smartphone,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: session, status } = useSession();

  // Allow both authenticated and non-authenticated users to view home
  // Authenticated users can navigate to analytics via navbar

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PublicNavbar />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Take control of your{" "}
              <span className="text-blue-600">finances</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Simple and powerful way to track your income and expenses. Analyze
              your financial habits and make smart decisions with our
              comprehensive analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {session ? (
                <a
                  href="/analytics"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Go to Analytics
                </a>
              ) : (
                <>
                  <a
                    href="/auth/signup"
                    className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
                  >
                    Get Started Free
                  </a>
                  <a
                    href="#demo"
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition-all border-2 border-blue-600"
                  >
                    View Demo
                  </a>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600">
                Everything you need to manage your personal finances
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Monthly & Yearly Analysis
                </h3>
                <p className="text-gray-600">
                  Track your income and expenses with detailed monthly and
                  yearly breakdowns
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-green-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <PieChart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Category Insights
                </h3>
                <p className="text-gray-600">
                  Visualize your spending patterns with detailed category
                  breakdowns
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-purple-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Trend Analysis
                </h3>
                <p className="text-gray-600">
                  Monitor your financial trends and identify patterns over time
                </p>
              </div>

              <div className="text-center p-6">
                <div className="bg-orange-100 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Calculator className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Smart Calculations
                </h3>
                <p className="text-gray-600">
                  Automatic calculations with real-time balance updates
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-20 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                See It In Action
              </h2>
              <p className="text-xl text-gray-600">
                Explore our analytics dashboard with sample data
              </p>
            </div>

            <DemoAnalytics />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Finance Tracker?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Secure & Private
                  </h3>
                  <p className="text-gray-600">
                    Your financial data is encrypted and stored securely. We
                    never share your information.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Smartphone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Mobile Friendly
                  </h3>
                  <p className="text-gray-600">
                    Access your finances on any device. Responsive design works
                    perfectly on mobile.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Fast & Simple
                  </h3>
                  <p className="text-gray-600">
                    Add transactions quickly and get instant insights into your
                    spending habits.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Multi-User Support
                  </h3>
                  <p className="text-gray-600">
                    Each user has their own secure account with personal
                    financial data.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Rich Analytics
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive charts and graphs to visualize your financial
                    journey.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Financial Goals
                  </h3>
                  <p className="text-gray-600">
                    Track your progress and make informed decisions about your
                    financial future.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Take Control?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of users who are already managing their finances
              better
            </p>
            {session ? (
              <a
                href="/analytics"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Go to Your Analytics
              </a>
            ) : (
              <a
                href="/auth/signup"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-medium hover:bg-gray-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Free Today
              </a>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
