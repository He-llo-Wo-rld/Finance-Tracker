import { Session } from "next-auth";

export const HeroSection = ({ session }: { session: Session | null }) => {
  return (
    <section className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Take control of your <span className="text-blue-600">finances</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Simple and powerful way to track your income and expenses. Analyze
          your financial habits and make smart decisions with our comprehensive
          analytics.
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
  );
};
