import { Session } from "next-auth";
export const WelcomeSection = ({ session }: { session: Session }) => {
  return (
    <div className="text-center py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Welcome back, {session.user?.name}!{" "}
      </h1>
      <p className="text-lg text-gray-600">
        Track your finances and analyze your spending patterns
      </p>
    </div>
  );
};
