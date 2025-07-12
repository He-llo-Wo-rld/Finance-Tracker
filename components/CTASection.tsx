import { Session } from "next-auth";

export const CTASection = ({ session }: { session: Session | null }) => {
  return (
    <section className="py-20 px-4 bg-blue-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Take Control?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join thousands of users who are already managing their finances better
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
  );
};
